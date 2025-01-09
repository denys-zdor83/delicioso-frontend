import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate, OrderCanceletionTemplate } from '@/shared/components';
import { capturePayment, generateAccessToken, sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
        const { token } = await req.json();
        const accessToken = await generateAccessToken();
        const captureResponse = await capturePayment(token, accessToken);
        const captureResponseId = captureResponse.purchase_units[0].payments?.captures[0]?.custom_id

        const order = await prisma.order.findFirst({
            where: {
                id: Number(captureResponseId),
            },
        });

        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found' });
        }

        const isSucceeded = captureResponse.status === 'COMPLETED';

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
            }
        });

        const items = JSON.parse(order?.items as string) as CartItemDTO[];

        if (isSucceeded) {
            console.log('Email sent SUCCESS');
            await sendEmail(
                order.email,
                'Delicioso Pizza / Your order is completed 🎉',
                OrderSuccessTemplate({ orderId: order.id, items }),
            );
        } else {
            // TODO: Send cancel order email. LATER

            // console.log('Email sent CANCEL');
            // await sendEmail(
            //     order.email,
            //     'Delicioso Pizza / Your order was canceled',
            //     OrderCanceletionTemplate({ orderId: order.id }),
            // );
        }

        return NextResponse.json({ success: true, data: captureResponse });
    } catch (error) {
        console.error('[capturePayment] Error capturing payment', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
};

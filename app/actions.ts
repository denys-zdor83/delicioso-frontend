'use server';

import { PaymentData, Link } from '@/@types/paypal';
import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants';
import { 
    createPayment, 
    sendEmail 
} from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Find the cart by token */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Return error if the cart is not found */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Return error if the cart is empty */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Create an order */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Clear the cart */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData: PaymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Order payment #' + order.id,
    });
    
    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    let paymentUrl = paymentData.links.find((link: Link) => link.rel === 'approve')?.href;


     // TODO: Redu with another library
    // await sendEmail(
    //   data.email,
    //   'Delicioso Pizza / Order payment #' + order.id,
    //   PayOrderTemplate({
    //     orderId: order.id,
    //     totalAmount: order.totalAmount,
    //     paymentUrl,
    //   }),
    // );

    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('The email is not confirmed');
      }

      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    // TODO: Redu with another library
    // await sendEmail(
    //   createdUser.email,
    //   'Delicioso Pizza / 📝 Registration confirmation',
    //   VerificationUserTemplate({
    //     code,
    //   }),
    // );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}

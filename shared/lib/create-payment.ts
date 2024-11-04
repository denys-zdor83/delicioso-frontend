import axios from "axios"
import { generateAccessToken } from ".";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  try {
    const accessToken = await generateAccessToken()

    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            custom_id: details.orderId,
            items: [
              {
                name: 'NAME_' + details.description,
                description: details.description,
                quantity: '1',
                unit_amount: {
                  currency_code: 'USD',
                  value: `${details.amount}`
                }
              }
            ],
            amount: {
              currency_code: 'USD',
              value: `${details.amount}`,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: `${details.amount}`
                }
              }
            }
          }
        ],
        application_context: {
          return_url: process.env.BASE_URL + '/complete-order',
          cancel_url: process.env.BASE_URL + '/complete-order',
          user_action: 'PAY_NOW',
          brand_name: 'Delicioso'
        }
      })
    })

    return response.data
  } catch (error) {
    console.log('[createPayment] Server error', error);
  }
}

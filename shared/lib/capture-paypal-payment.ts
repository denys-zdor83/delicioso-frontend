import axios from "axios"

export const capturePayment = async (token: string, accessToken: string) => {
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
  });

  return response.data
}
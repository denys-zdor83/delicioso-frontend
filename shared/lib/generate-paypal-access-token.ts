import axios from "axios"

export async function generateAccessToken() {
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
    method: 'post',
    data: 'grant_type=client_credentials',
    auth: {
        username: process.env.PAYPAL_CLIENT_ID as string,
        password: process.env.PAYPAL_SECRET as string
    }
  })

  return response.data.access_token
}
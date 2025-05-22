import axios from 'axios';

export async function generateToken(data: any, apiKey: string) {
  const apiUrl = 'https://api.stripe.com/v1/tokens';

  try {
    const response = await axios.post(
      apiUrl,
      {
        card: {
          number: data.number,
          exp_month: data.expiryMonth,
          exp_year: data.expiryYear,
          cvc: data.cvc,
        },
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
      console.log(error.response.data.error.message, apiKey);
    throw error;
  }
}

export async function generatePaymentMethod(data: string, secretKey: string) {
  const apiUrl = 'https://api.stripe.com/v1/payment_methods';
  try {
    const response = await axios.post(
      apiUrl,
      new URLSearchParams({
        type: 'card',
        'card[token]': data,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data, secretKey);
    
    //   setPaymentError(error.response.data.error.message);
    throw error;
  }
}

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import axios from 'axios';

export default function CompleteOrder() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token'); // Extract token and PayerID from query params
    const [status, setStatus] = useState('Processing payment...');

    useEffect(() => {
      if (token) {
        const capturePayment = async () => {
          try {
            const response = await axios({
              url: '/api/capture-payment',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                token
              }
            });

            setStatus('Payment captured successfully!');
          } catch (error) {
            console.error('Error capturing payment:', error);
            setStatus('Failed to capture payment. Please try again.');
          }
        };

        capturePayment();
      }
    }, [token]);

    return (
        <div>
            <h1>Order Completion</h1>
            <p>{status}</p>
        </div>
    );
}

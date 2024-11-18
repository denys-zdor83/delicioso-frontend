'use client';

import React from 'react';
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { PaymentStatus } from '@/shared/components/shared/PaymentStatus';
import { Suspense } from 'react';

export default function CompleteOrder() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token'); // Extract token and PayerID from query params
    const [status, setStatus] = React.useState(false);
    const [loadingStatus, setLoadingStatus] = React.useState(true);

    React.useEffect(() => {
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

            setStatus(true);
            setLoadingStatus(false);
          } catch (error) {
            console.error('Error capturing payment:', error);
            setStatus(false);
            setLoadingStatus(false);

          }
        };

        capturePayment();
      }
    }, [token]);

    // TODO Try to make it with Suspence component
    if (loadingStatus) {
      return (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center">
          {
            status ? (
              <PaymentStatus 
                className='mt-10'
                title="Payment completed successfully" 
                imageUrl="/assets/images/payment-success.png" 
              />
            ) : (
              <PaymentStatus 
                className='mt-10'
                title="Payment wasn't completed" 
                imageUrl="/assets/images/payment-error.png" 
              />
            ) 
          }
        </div>
      );
    }

}

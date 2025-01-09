'use client';

import React from 'react';
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { PaymentStatus } from '@/shared/components/shared/PaymentStatus';
import { Loader } from 'lucide-react';
import { Title } from '@/shared/components/shared';


export default function CompleteOrder() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token');
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
          } catch (error) {
            console.error('Error capturing payment:', error);
            setStatus(false);
          } finally {
            setLoadingStatus(false);
          }
        };

        capturePayment();
      }
    }, [token]);

    // TODO Try to make it with Suspence component. LATER
    if (loadingStatus) {
      return (
        <div className="flex flex-col items-center mt-10">
          <Title size="lg" text="Please wait..." className="font-extrabold" />
          <div>
            <Loader className="w-10 h-10 animate-spin text-black" />
          </div>
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
                title="Payment failed" 
                imageUrl="/assets/images/payment-error.png" 
              />
            ) 
          }
        </div>
      );
    }

}

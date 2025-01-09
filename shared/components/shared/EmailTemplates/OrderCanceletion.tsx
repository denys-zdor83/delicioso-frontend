import React from 'react';

interface Props {
  orderId: number;
}

export const OrderCanceletionTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>Order Canceletion</h1>

    <p>Your order #{orderId} was canceled.</p>
  </div>
);
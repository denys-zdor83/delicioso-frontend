import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Title } from '.';

interface Props {
  title?: string;
  className?: string;
  imageUrl?: string;
}

export const PaymentStatus: React.FC<Props> = ({ className, title = '', imageUrl }) => {
  return (
    <div className={cn(className, 'flex flex-col items-center justify-center')}>
      <Title size="lg" text={title} className="font-extrabold" />
      <img className="mt-6" src={imageUrl} alt="payment-icon" width={200} />
      <Link href="/">
        <Button variant="outline" className="gap-2 mt-6">
          <ArrowLeft />
          Home
        </Button>
      </Link>
    </div>
  );
};
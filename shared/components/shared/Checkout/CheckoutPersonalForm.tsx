import React from 'react';
import { WhiteBlock } from '../WhiteBlock';
import { FormInput } from '@/shared/components/shared';
import { Input } from '../../ui';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title='2. Personal info' className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="Name" />
                <FormInput name="lastName" className="text-base" placeholder="Surname" />
                <FormInput name="email" className="text-base" placeholder="E-mail" />
                <FormInput name="phone" className="text-base" placeholder="Phone" />
            </div>
        </WhiteBlock>
    );
};
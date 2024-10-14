'use client';

import React from 'react';
// import { FormTextarea } from '../form';
// import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
// import { ErrorText } from '../error-text';
import { Input, Textarea } from '../../ui';
import { WhiteBlock } from '../WhiteBlock';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/* <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        /> */}


        <Input name="firstName" className="text-base" placeholder="Address" />
        <Textarea 
            className="text-base" 
            rows={5} 
            placeholder="Coments to the order" 
        />

      </div>
    </WhiteBlock>
  );
};
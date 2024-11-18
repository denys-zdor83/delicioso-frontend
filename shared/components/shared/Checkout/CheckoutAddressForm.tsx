'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { WhiteBlock } from '../WhiteBlock';
import { FormTextarea } from '../Form';
import { AddressInput } from '../';
import { ErrorText } from '../ErrorText';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">


        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
                {/* TODO Change the address library to US or Canadian */}
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comments"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { WhiteBlock } from '../WhiteBlock';
import { FormTextarea, FormInput } from '../Form';
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

        {/* TODO Change the address library to Canadian. LATER */}
        {/* <Controller 
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />*/}

        <FormInput
          name="address"
          className="text-base"
          placeholder="Address"
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
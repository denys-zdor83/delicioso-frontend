'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="11a99ee1c11179d1c49fa87b33623ce5b4cabd89"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
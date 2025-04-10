import React from 'react';
import Typography from './typography';

type Props = {
  label: string;
  children: React.ReactNode;
};
const FormField = ({ label, children }: Props) => (
  <div>
    <Typography className="block text-sm font-medium text-gray-600 mb-1" variant={'h2_bold'}>
      {label}
    </Typography>
    {children}
  </div>
);

export default FormField;
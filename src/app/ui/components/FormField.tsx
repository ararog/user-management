import React from 'react';
import ErrorMessages from '@/ui/components/ErrorMessages';

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  errors: string[];
  style?: string;
};

const FormField = ({label, name, errors, type} : FormFieldProps) => {
  return (
    <div className='flex flex-col p-4'>
      <p><label className='w-24'>{label}</label></p> 
      <input className='w-48 bg-white' type={type} name={name} />
      <ErrorMessages className="list-none bg-red-500" errors={errors} />
    </div>
  );
};

export default FormField;
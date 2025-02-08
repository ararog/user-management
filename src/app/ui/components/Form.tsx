import React from 'react';

type FormProps = {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined
  children: React.ReactNode;
};

const Form = ({ action, children }: FormProps) => {
  return (
    <div className="flex flex-col p-4">
      <form action={action}>
        <div className="flex flex-col items-center justify-center">

          {children}
        </div>
      </form>
    </div>  
  );
};



export default Form;
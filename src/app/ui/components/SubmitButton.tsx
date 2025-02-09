'use client'

import { cva } from 'class-variance-authority';
import React from 'react';

type SubmitButtonProps = {
  pending: boolean
  text: string
  pendingText: string
  className?: string
}

const button = cva(
  "mt-8 w-36 h-12 bg-blue-500", 
  {
    variants: {
      disabled: {
        true: "bg-blue-300",
        false: "bg-blue-500",
      },
    },
    defaultVariants: {
      disabled: false,
    }
  }
);

export default function SubmitButton({text, pending, pendingText}: SubmitButtonProps) {
  return (
    <button type='submit' className={button({disabled: pending})} disabled={
      pending}>
      {pending ? pendingText : text}
    </button>
  );
}
'use client'

import React from 'react';

type SubmitButtonProps = {
  pending: boolean
  text: string
  pendingText: string
  className?: string
}

export default function SubmitButton(props: SubmitButtonProps) {
  return <button type='submit' className="mt-8 w-36 h-12 bg-blue-500" disabled={props.pending}>{props.pending ? props.pendingText : props.text}</button>
}
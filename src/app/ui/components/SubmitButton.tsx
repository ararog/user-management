'use client'

import React from 'react';

type SubmitButtonProps = {
  pending: boolean
  text: string
  pendingText: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
}

export default function SubmitButton(props: SubmitButtonProps) {
  return <button type='submit' className={props.style} disabled={props.pending}>{props.pending ? props.pendingText : props.text}</button>
}

import React from 'react';

type MessageProps = {
  errors: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
}

export default function ErrorMessages(props: MessageProps) {
  return (
    <ul>
      {
        props.errors?.map((message: string) => <li key={message} className={props.style} >{message}</li>) 
      }
    </ul>        
  )
}
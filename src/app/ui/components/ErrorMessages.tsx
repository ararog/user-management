
import React from 'react';

type MessageProps = {
  errors: string[]
  className?: string
}

export default function ErrorMessages(props: MessageProps) {
  return (
    <ul>
      {
        props.errors?.map((message: string) => <li key={message} className={props.className} >{message}</li>) 
      }
    </ul>
  )
}
'use client'

import { useRouter } from 'next/navigation'
import styles from "./page.module.css";
import { FormEvent, useState } from 'react';
import { ValidationErrors } from '@/types';

export default function AddUser() {
  const [errors, setErrors] = useState<ValidationErrors>();
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    })
 
    // Handle response if necessary
    if(response.status == 201) {
      router.push("/");
    } else if(response.status == 400) {
      const data = await response.json();
      if(data.errors)
        setErrors(data.errors)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Add User</h1>
      <div className={styles.menu}>
        <form onSubmit={onSubmit}>
          <div className={styles.form}>
            <div className={styles.entry}>
              <p><label className={styles.label}>Name:</label></p>
              <input className={styles.input} type="text" name="name" /> 
              <ul>
                {
                  errors?.name?.map((message: string) => <li key={message} className={styles.message} >{message}</li>) 
                }
              </ul>             
            </div>
            <div className={styles.entry}>
              <p><label className={styles.label}>Email:</label></p>
              <input className={styles.input} type="text" name="email" />
              <ul>
                {
                  errors?.email?.map((message: string) => <li key={message} className={styles.message} >{message}</li>) 
                }
              </ul>             
            </div>
            <div className={styles.entry}>
              <p><label className={styles.label}>Password:</label></p> 
              <input className={styles.input} type="password" name="password" />
              <ul>
                {
                  errors?.password?.map((message: string) => <li key={message} className={styles.message} >{message}</li>) 
                }
              </ul>             
            </div>
            <div className={styles.entry}>
              <p><label className={styles.label}>Password Confirmation:</label></p> 
              <input className={styles.input} type="password" name="confirmPassword" />
              <ul>
                {
                  errors?.confirmPassword?.map((message: string) => <li key={message} className={styles.message} >{message}</li>) 
                }
              </ul>             
            </div>
            <button type='submit' className={styles.button}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

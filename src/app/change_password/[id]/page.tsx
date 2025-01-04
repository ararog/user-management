'use client'

import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react';
import styles from "./page.module.css";
import { ValidationErrors } from '@/types';
import { apiClient } from '@/helpers/api';

export default function ChangePassword() {
  const [errors, setErrors] = useState<ValidationErrors>();
  const params = useParams<{ id: string }>()
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await apiClient(`/api/users/${params?.id}/password`, {
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(formData)),
    })
 
    // Handle response if necessary
    if(response.status == 200) {
      router.push("/");
    } else if(response.status == 400) {
      const data = await response.json();
      if(data.errors)
        setErrors(data.errors)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Change Password</h1>
      <div className={styles.menu}>
        <form onSubmit={onSubmit}>
          <div className={styles.form}>
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
            <button type='submit' className={styles.button}>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

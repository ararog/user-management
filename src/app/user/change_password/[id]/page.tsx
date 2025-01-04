'use client'

import { useParams } from 'next/navigation'
import { useActionState } from 'react';
import styles from "./page.module.css";
import ErrorMessages from '@/ui/components/ErrorMessages';
import SubmitButton from '@/ui/components/SubmitButton';
import { updatePassword } from '@/ui/actions/updatePassword';

export default function ChangePassword() {
  const params = useParams<{ id: string }>()
  const [errors, formAction, pending] = useActionState(updatePassword, null);  

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Change Password</h1>
      <div className={styles.menu}>
        <form action={formAction}>
          <div className={styles.form}>
            <div className={styles.entry}>
              <p><label className={styles.label}>Password:</label></p> 
              <input className={styles.input} type="password" name="password" />
              <ErrorMessages errors={errors?.password} style={styles.message} />              
            </div>
            <div className={styles.entry}>
              <p><label className={styles.label}>Password Confirmation:</label></p> 
              <input className={styles.input} type="password" name="confirmPassword" />
              <ErrorMessages errors={errors?.confirmPassword} style={styles.message} />              
            </div>
            <input type="hidden" name="id" value={params?.id} />
            <SubmitButton pending={pending} style={styles.button} text="Update Password" pendingText="Updating..." />
          </div>
        </form>
      </div>
    </div>
  );
}

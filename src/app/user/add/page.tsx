'use client'

import styles from "./page.module.css";
import { useActionState } from 'react';
import { createUser } from "@/ui/actions/createUser";
import ErrorMessages from "@/ui/components/ErrorMessages";
import SubmitButton from "@/ui/components/SubmitButton";

export default function AddUser() {
  const [errors, formAction, pending] = useActionState(createUser, {});

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Add User</h1>
      <div className={styles.menu}>
        <form action={formAction}>
          <div className={styles.form}>
            <div className={styles.entry}>
              <p><label className={styles.label}>Name:</label></p>
              <input className={styles.input} type="text" name="name" /> 
              <ErrorMessages errors={errors?.name} style={styles.message} />
            </div>
            <div className={styles.entry}>
              <p><label className={styles.label}>Email:</label></p>
              <input className={styles.input} type="text" name="email" />
              <ErrorMessages errors={errors?.email} style={styles.message} />
            </div>
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
            <SubmitButton pending={pending} style={styles.button} text="Save" pendingText="Saving..." />
          </div>
        </form>
      </div>
    </div>
  );
}

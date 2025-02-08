'use client'

import { useActionState } from 'react';
import { createUser } from "@/ui/actions/createUser";
import SubmitButton from "@/ui/components/SubmitButton";
import FormField from "@/ui/components/FormField";
import Page from '@/ui/components/Page';
import Form from '@/ui/components/Form';

export default function AddUser() {
  const [errors, formAction, pending] = useActionState(createUser, {});

  return (
    <Page title="Add User">
      <Form action={formAction}>
        <FormField 
          label="Name:" 
          name="name" 
          type="text" 
          errors={errors.name} 
        />
        <FormField 
          label="Email:" 
          name="email" 
          type="text" 
          errors={errors.emails} 
        />
        <FormField 
          label="Password:" 
          name="password" 
          type="password" 
          errors={errors.password} 
        />
        <FormField 
          label="Password Confirmation:" 
          name="confirmPassword" 
          type="password" 
          errors={errors.confirmPassword} 
        />
        <SubmitButton pending={pending} text="Save" pendingText="Saving..." />
      </Form>
    </Page>
  );
}

'use client'

import { useParams } from 'next/navigation'
import { useActionState } from 'react';
import SubmitButton from '@/ui/components/SubmitButton';
import { updatePassword } from '@/ui/actions/updatePassword';
import FormField from '@/ui/components/FormField';
import Page from '@/ui/components/Page';
import Form from '@/ui/components/Form';

export default function ChangePassword() {
  const params = useParams<{ id: string }>()
  const [errors, formAction, pending] = useActionState(updatePassword, null);  

  return (
    <Page title="Change Password">
      <Form action={formAction}>
        <FormField 
          label="New Password:" 
          name="password" 
          type="password" 
          errors={errors.password} 
        />
        <FormField 
          label="Password Confirmation:" 
          name="confirmPassword" 
          type="password" 
          errors={errors.password} 
        />
        <input type="hidden" name="id" value={params?.id} />
        <SubmitButton pending={pending} text="Update Password" pendingText="Updating..." />
      </Form>
    </Page>
  );
}

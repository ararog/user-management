'use server'

import { apiClient } from '@/helpers/api'; 
import { redirect } from 'next/navigation'
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(prevState: any,formData: FormData) {
  const response = await apiClient('/api/users', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
  })

  // Handle response if necessary
  if(response.status == 201) {
    redirect("/");
  } else if(response.status == 400) {
    const data = await response.json();
    if(data.errors)
      return data.errors
  }
}
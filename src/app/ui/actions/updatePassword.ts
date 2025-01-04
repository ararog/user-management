'use server'
 
import { apiClient } from '@/helpers/api';
import { redirect } from 'next/navigation'
 
export async function updatePassword( formData: FormData ) {
    const response = await apiClient(`/api/users/${formData.get("id")}/password`, {
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(formData)),
    })
 
    // Handle response if necessary
    if(response.status == 200) {
      redirect("/");
    } else if(response.status == 400) {
      const data = await response.json();
      if(data.errors)
        return data.errors
    }
}
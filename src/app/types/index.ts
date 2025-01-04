export type Props = {
  params: Promise<{ id: string }>
}

export type ValidationErrors = {
  name: string[]
  email: string[]
  password: string[]
  confirmPassword: string[]
}
import { object, string } from "zod";
 
export const NewUserSchema = object({
  name: string({ required_error: "Email is required" })
    .min(1, "Email is required"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Password confirmation is required" })
    .min(1, "Password confirmation is required")
    .min(8, "Password confirmation must be more than 8 characters")
    .max(32, "Password  confirmation must be less than 32 characters")
}).refine(data => data.password === data.confirmPassword, {
  message: "Password and its confirmation doesn't match",
  path: ['confirmPassword'] 
});

export const UpdatePasswordSchema = object({
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password and its confirmation doesn't match",
  path: ['confirmPassword'] 
});
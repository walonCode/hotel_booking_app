import { z } from "zod"

export const userRegister = z.object({
    name:z.string().min(5, "Please enter your fullname"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must have atleast 8 characters"),
    role:z.enum(["user","admin","hotel_owner"])
})

export const userLogin = z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(8, "Password must have atleast 8 characters"),
})
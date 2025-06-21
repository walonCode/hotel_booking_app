import { z } from "zod";

export const loginSchema = z.object({
    username:z.string().min(2, "Please from a valid username"),
    password:z.string().min(8,"Please provide a valid password")
})


export const registerSchema = z.object({
    name:z.string().min(2, "Please provide a valid name"),
    username:z.string().min(2, "Please provide a valid username"),
    email:z.string().email("Please provide a valid email"),
    password:z.string().min(8,"Please provide a valid password"),
    roles:z.enum(["user","admin","hotel_owner"]).optional()
})
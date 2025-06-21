import { z } from "zod";

export const loginSchema = z.object({
    username:z.string().min(2, "Please from a valid username"),
    password:z.string().min(8,"Please provide a valid password")
})
import "dotenv/config"
import { z } from "zod"

const configSchema = z.object({
    PORT: z.string().min(1, "PORT is required in .env"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required in .env"),
    NODE_ENV: z.string().min(1, "NODE_ENV is required in the .env"),
    JWT_SECRET:z.string().min(1,"JWT_SECRET is required in the .env")
})


const result = configSchema.safeParse({
    PORT:process.env.PORT,
    DATABASE_URL:process.env.DATABASE_URL,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECRET:process.env.JWT_SECRET
})

if(!result.success){
    console.error("Invalid environment configuration: \n", result.error.message)
    process.exit(1);
}

export const config = result.data
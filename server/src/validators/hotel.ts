import { z } from "zod"

export const hotelCreateSchema = z.object({
    name:z.string().min(2),
    description: z.string().min(2),
    address:z.string().min(2),
    city:z.string().min(2),
    stars:z.number().min(2),
    amenities:z.array(z.string().min(1)),
    images:z.array(z.string().min(2))
})
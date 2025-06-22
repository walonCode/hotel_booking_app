import { z } from "zod"


export const roomCreateSchema = z.object({
    hotelId: z.number().min(2),
    name: z.string().min(2),
    description: z.string().min(2),
    price: z.number().min(2),
    capacity: z.number().min(2),
    amenities: z.array(z.string().min(2)),
    images: z.array(z.string().min(2)),
})


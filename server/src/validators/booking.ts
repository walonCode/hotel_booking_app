import { z } from "zod"

export const bookingCreateSchema = z.object({
    hotelId:z.number().min(2),
    roomId:z.number().min(2),
    checkIn: z.date(),
    checkOut:z.date(),
    totalPrice:z.number().min(2),
    isPaid: z.boolean().optional().default(false),
    status:z.enum(["pending","completed","cancel"]).optional().default("pending")
})

import { z } from "zod"

export const makePaymentSchema = z.object({
    paymentName: z.string().min(2,"Payment must be two characters or more in length"),
    username: z.string().min(2, "Username must be two characters or more"),
    phoneNumber: z.string().min(2).max(9, "Phone number must be 9 numbers in length"),
    userId: z.string().min(2, "UserId must be have 2 characters or more"),
    amount: z.string().min(2, "Amount must be 2 characters or more"),
    roomId: z.string().min(5, "RoomId must have 5 characters or more")
})
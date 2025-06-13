import { Response, Request } from "express";
import createPaymentCode from "../utils/makePayment";
import { makePaymentSchema } from "../validators/paymentSchema";


export const makePayment = async(req:Request, res:Response) => {
    try{
        const reqBody = req.body
        const result = makePaymentSchema.safeParse(reqBody)
        if(!result.success){
            console.log(result.error.message)
            res.status(400).json({message:"invalid body"})
        }
        const {username, phoneNumber, paymentName, userId, amount, roomId} = result.data!

        const payment = await createPaymentCode(username,paymentName, amount, phoneNumber, userId)
        if(payment?.success){
            //create a new payment 
            
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
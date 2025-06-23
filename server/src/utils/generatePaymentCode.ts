import axios from 'axios'
import { config } from '../config/configs.js';
import type { RootObject } from '../types/types.js';
import { nanoid } from 'nanoid';


const URL = "https://api.monime.io/payment-codes"

export default async function generateCode(
    PaymentName:string,
    Name:string,
    Amount:string,
    PhoneNumber:string,
    userId:string
):Promise<RootObject | undefined>{
    try{

        const body = {
           name: `${PaymentName}`,
           mode: "recurrent",
           isActive: true,
           amount: {
             currency: "SLE",
             value: Number(Amount) * 100,
           },
           duration: "30m",
           customerTarget: {
             name: `${Name}`,
             reference: "0123456789",
             payingPhoneNumber: `${PhoneNumber}`,
           },
           allowedProviders: ["m17", "m18"],
           metadata: {},
        };

        const response = await axios.post(URL, body,{
            headers:{
                'Monime-Space-Id': `${config.MONIME_SPACE_ID}`,
                'Idempotency-Key': `${userId + nanoid()}`,
                Authorization: `Bearer ${config.MONIME_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })

        return response.data as RootObject
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err) : ""
    }
}

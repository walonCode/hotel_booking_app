import { CorsOptions } from "cors"

const allowedOrigin = ["http://localhost:3000/"]

export const corsOptions:CorsOptions = {
    origin(origin, callback) {
        console.log(`Origin ${origin}`)
        if(allowedOrigin.includes(origin as string) || !origin){
            callback(null , true)
        }else {
            callback(new Error("Not allowed by CORS!"))
        }
    },
    allowedHeaders : [
        'Content-Type',
        'Set-Cookie',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials'
    ],
    methods: ["POST","PATCH","PUT","GET","DELETE"],
    credentials:true,
}
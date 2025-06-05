import * as Express from "express"

interface User {
    id:string,
    name:string,
    role:string
}

declare global {
    namespace Express {
        interface Request {
            user?:User
        }
    }
}
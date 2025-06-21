import { createMiddleware } from "hono/factory";
import { Jwt } from "hono/utils/jwt";
import { config } from "../config/configs.js";

interface User {
    id:string,
    username:string
    exp:number
}


export const authMiddleware = createMiddleware<{
    Variables:{
        user:User
    }
}>(async (c, next) => {
    const authHeader = c.req.header("Authorization")
    if(!authHeader || authHeader.startsWith("Bearer ")){
        return c.json({
            ok:false,
            error:"unauthorized",
        },401)
    }

    const token = authHeader.replace('Bearer ', " ")

    try{
        const decoded = await Jwt.verify(token, config.JWT_SECRET) as unknown as User
        c.set("user", decoded)

        await next()
    }catch(err){
        config.NODE_ENV == "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"invalid token",
        }, 401)
    }

})
import { createMiddleware } from "hono/factory";

export enum Role{
    USER = "user",
    ADMIN = "admin",
    HOTEL_OWNER = "hotel_owner"
}

export const role = (role:Role) => createMiddleware(async(c,next)=> {
    const user = c.get("user")

    console.log(user.roles)

    if(!user || user.roles !== role){
        return c.json({
            ok:false,
            error:"Unauthorized: insufficient permissions"
        }, 403)
    }

    await next()
})
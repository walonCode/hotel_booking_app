import { Hono } from "hono";
import { config } from "../config/configs.js";
import { validateBody } from "../middleware/validator.js";
import { loginSchema } from "../validators/user.js";
import { db } from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Jwt } from "hono/utils/jwt";

const app = new Hono().basePath("/auth")

//login
app.post("/token",validateBody(loginSchema), async(c) => {
    try{
        const data = c.get("validatedData")

        //checking if the user existing
        const user = await db.select().from(userTable).where(eq(userTable.username, data.username))

        if(user.length === 0 || await bcrypt.compare(data.password, userTable.password as unknown as string)){
            return c.json({
                ok:false,
                error:"invalid username or password"
            })
        }

        const accessToken = await Jwt.sign({id:userTable.id, username:userTable.username, exp:24*60*60}, config.JWT_SECRET, "HS256")

        return c.json({
            ok:true,
            message:"login",
            data:{
                token: accessToken,
            }
        }, 200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err): ""
        return c.json({
            ok:false,
            error:"Internal server error",
        },500)
    }
})



//register
app.post("/register", async(c) => {
    try{
        const body = c.req.json()


        return c.json({
            ok:true,
            message:"user registered",
        },201)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"Internal server error",
        },500)
    }
})

export default app
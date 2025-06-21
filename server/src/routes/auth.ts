import { Hono } from "hono";
import { config } from "../config/configs.js";
import { validateBody } from "../middleware/validator.js";
import { loginSchema, registerSchema } from "../validators/user.js";
import { db } from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Jwt } from "hono/utils/jwt";

const app = new Hono().basePath("/auth")

//login
app.post("/token",validateBody(loginSchema), async(c) => {
    try{
        const data = c.get("validatedData")

        //checking if the user existing
        const user = await db.select().from(userTable).where(eq(userTable.username, data.username)).limit(1)

        if(user.length === 0 || !(await bcrypt.compare(data.password, user[0].password as string))){
            return c.json({
                ok:false,
                error:"invalid username or password"
            },400)
        }

        const accessToken = await Jwt.sign({id:user[0].id, roles:user[0].roles, exp:24*60*60}, config.JWT_SECRET, "HS256")

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
app.post("/register", validateBody(registerSchema) ,async(c) => {
    try{
        const body = c.get("validatedData")

        //checking to see if the user exist
        const user = await db.select().from(userTable).where(and(eq(userTable.email, body.email),eq(userTable.username, body.username))).limit(1)
        
        if(user.length !== 0){
            return c.json({
                ok:false,
                error:"user already exist",
            }, 409)
        }

        //hashing the password
        const passwordHashed = await bcrypt.hash(body.password, 10)

        //creating the new user
        await db.insert(userTable).values({username:body.username, password:passwordHashed, name:body.name, email:body.email})

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
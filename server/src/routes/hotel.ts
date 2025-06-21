import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";

const app = new Hono().basePath("/hotel")

app.post("/", authMiddleware, async(c) => {
    try{
        const user = c.get("user")
        
    }catch(err){

    }
})


export default app
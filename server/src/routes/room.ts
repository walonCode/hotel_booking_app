import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { Role, role } from "../middleware/roleMiddleware.js";
import { validateBody } from "../middleware/validator.js";
import { roomCreateSchema } from "../validators/room.js";
import { config } from "../config/configs.js";
import { db } from "../db/drizzle.js";
import { roomTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

const app = new Hono().basePath("/room")


app.post("/", authMiddleware, role(Role.HOTEL_OWNER), validateBody(roomCreateSchema), async(c) => {
    try{
        const body = c.get('validatedData')

        //checking if the room already exist
        const room = await db.select().from(roomTable).where(and(eq(roomTable.name, body.name), eq(roomTable.hotelId, body.hotelId))).limit(1)
        if(room.length > 0){
            return c.json({
                ok:false,
                error:"room already exist",
            }, 409)
        }

        //future saving the image to supabase and getting the urls

        //making the new room
        await db.insert(roomTable).values({
            hotelId:body.hotelId,
            name:body.name,
            description:body.description,
            price:body.price,
            capacity:body.capacity,
            images:body.images,
            amenities:body.amenities
        })


        return c.json({
            ok:true,
            message:"room created",
        }, 201)

    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"internal server error"
        },500)
    }
})


app.get('/:hotelId', authMiddleware, async(c) => {
    try{
        //getting the rooms per hotel

        const hotelId = c.req.param('hotelId')

        const rooms = await db.select().from(roomTable).where(eq(roomTable.hotelId, Number(hotelId))).orderBy(roomTable.price)
        if(rooms.length === 0){
            return c.json({
                ok:true,
                message:"no rooms at yet for this hotel",
            },200)
        }

        return c.json({
            ok:true,
            message:"all rooms for this hotel",
            data:rooms
        },200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"internal server error"
        },500)
    }
})

app.delete("/:roomId", authMiddleware, role(Role.HOTEL_OWNER), async(c) => {
    try{
        const roomId = c.req.param('roomId')

        await db.delete(roomTable).where(eq(roomTable.id, Number(roomId)))

        return c.json({
            ok:true,
            message:"room deleted",
        }, 200)
        
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err): ""
        return c.json({
            ok:false,
            error:"internal server error",
        }, 500)
    }
})


export default app
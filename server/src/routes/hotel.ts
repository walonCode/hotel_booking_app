import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { config } from "../config/configs.js";
import { validateBody } from "../middleware/validator.js";
import { hotelCreateSchema } from "../validators/hotel.js";
import { db } from "../db/drizzle.js";
import { hotelTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
import { Role, role } from "../middleware/roleMiddleware.js";

const app = new Hono().basePath("/hotel")

app.post("/", authMiddleware, role(Role.HOTEL_OWNER) ,validateBody(hotelCreateSchema), async(c) => {
    try{

        //getting the userId from the auth middleware
        const user = c.get("user")

        //getting the body from the validate body
        const body = c.get('validatedData')

        //checking if the hotel already exist
        const hotel = await db.select().from(hotelTable).where(and(eq(hotelTable.name, body.name), eq(hotelTable.description, body.description)))
        if(hotel.length !== 0){
            return c.json({
                ok:false,
                error:"hotel already exist",
            },409)
        }

        //image check
        //saving them to supabase and getting the url

        //creating the new hotel
        await db.insert(hotelTable).values({
            name:body.name,
            description:body.description,
            amenities:body.amenities,
            ownerId:user.id,
            images:body.images,
            address:body.address,
            city:body.city,
            stars:body.stars,
        })


        return c.json({
            ok:true,
            message:"hotel created",
        }, 201)
        
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err) : ""
        return c.json({
            ok:false,
            error:"internal server error"
        },500)
    }
})


app.get("/",authMiddleware, async(c) => {
    try{
        const hotels = await db.select().from(hotelTable)

        if(hotels.length === 0){
            return c.json({
                ok:true,
                message:"No available hotels",
                data: [],
            },200)
        }

        return c.json({
            ok: true,
            message:"available hotels", 
            data:hotels
        },200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err) : ""
        return c.json({
            ok:false,
            error:"internal server error",
        }, 500)
    }
})


app.delete("/:id",authMiddleware, role(Role.HOTEL_OWNER), async(c) => {
    try{
        const id = c.req.param("id")

        await db.delete(hotelTable).where(eq(hotelTable.id, Number(id)))

        return c.json({
            ok:true,
            message:"hotel deleted",
        }, 200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"internal server error"
        },500)
    }
})


export default app
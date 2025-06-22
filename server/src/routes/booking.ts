import { Hono } from "hono";
import { config } from "../config/configs.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { db } from "../db/drizzle.js";
import { bookingTable, } from "../db/schema.js";
import { and,eq,lt,gt } from "drizzle-orm";
import { validateBody } from "../middleware/validator.js";
import { bookingCreateSchema } from "../validators/booking.js";
import { Role, role } from "../middleware/roleMiddleware.js";


const app = new Hono().basePath("/booking")

app.post("/", authMiddleware, validateBody(bookingCreateSchema), async(c) => {
    try{
        const user = c.get("user")
        const body = c.get("validatedData")

        //checking to see if a booking already exist
        const booking = await db.select().from(bookingTable).where(and(eq(bookingTable.roomId, body.roomId), lt(bookingTable.checkIn, body.checkIn), gt(bookingTable.checkOut, body.checkOut))).limit(1)
        if(booking.length > 0){
            return c.json({
                ok:false,
                error:"Booking already exists for this room"
            }, 409)
        }

        //creating a new booking
        await db.insert(bookingTable).values({
            userId:user.id,
            roomId:body.roomId,
            hotelId:body.hotelId,
            isPaid:body.isPaid,
            status:body.status,
            totalPrice:body.totalPrice,
            checkIn:body.checkIn,
            checkOut:body.checkOut,
        })

        return c.json({
            ok:true,
            message:"booking created",
        },201)

    }catch(err){
        config.NODE_ENV === "dev"? console.log(err):""
        return c.json({
            ok:false,
            error:"Internal server error"
        },500)
    }
})


app.get("/:hotelId",authMiddleware, role(Role.HOTEL_OWNER), async(c) => {
    try{
        const hotelId = c.req.param("hotelId")
 
        const booking = await db.select().from(bookingTable).where(eq(bookingTable.hotelId, Number(hotelId)))

        if(booking.length === 0){
            return c.json({
                ok:true,
                message:"no booking for this hotels"
            },200)
        }

        return c.json({
            ok:true,
            message:"booking for this hotels",
            data:booking,
        }, 200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err): ""
        return c.json({
            ok:false,
            error:"Internal server error",
        }, 500)
    }
})

app.get("/userId", authMiddleware, role(Role.USER), async(c) => {
    try{
        const userId = c.req.param("userId")

        const booking = await db.select().from(bookingTable).where(eq(bookingTable.userId, Number(userId)))
        if(booking.length === 0){
            return c.json({
                ok:true,
                message:"no booking for this users",
            },200)
        }

        return c.json({
            ok:true,
            message:"user booking",
            data:booking
        },200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err) : ""
        return c.json({
            ok:false,
            error:"internal server error",
        }, 500)
    }
})


app.delete("/bookingId",authMiddleware, async(c) => {
    try{
        const bookingId = c.req.param("bookingId")
        
        await db.delete(bookingTable).where(eq(bookingTable.id, Number(bookingId)))

        return c.json({
            ok:true,
            message:"booking delete"
        }, 200)
    }catch(err){
        config.NODE_ENV === "dev" ? console.log(err):""
        return c.json({
            ok:false,
            error:"internal server error",
        },500)
    }
})


export default app
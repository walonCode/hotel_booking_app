import express from "express"
import paymentRouter from "./routes/paymentRoute"
import cors from "cors"
import { corsOptions } from "./configs/corsOptions"

const app = express()

//middleware
app.use(cors(corsOptions))
app.use(express.json())


//health check route
app.get("/", async(req,res)=> {
    res.status(200).json({"message":"hello"})
})

//payment router
app.use("/api/v1/", paymentRouter)



app.listen(3000, () => {
    console.log("server is up and running")
})
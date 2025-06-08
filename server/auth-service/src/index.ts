import express from "express";
import cors from "cors"
import { config } from "dotenv";
import { connectDB } from "./configs/connectDB";
import authRouter from "./routes/authRoute";
import { corsOptions } from "./configs/corOption";

const app = express()

config()

connectDB()

//middlewares
app.use(express.json())
app.use(cors(corsOptions))


//route
app.use("/api/v1/user", authRouter)

const PORT = process.env.PORT || 5000


app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`)
})
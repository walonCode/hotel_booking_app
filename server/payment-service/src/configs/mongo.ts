import mongoose from "mongoose";


export const connectDB = async() => {
    console.log("MongoDB connection with retry")
    try{
        await mongoose.connect(process.env.DATABASE_URI_PAYMENT!, {
            dbName:"payment",
        })
    }catch(err){
        console.error(err)
        setTimeout(() => {
            connectDB()
        },5000)
    }
}
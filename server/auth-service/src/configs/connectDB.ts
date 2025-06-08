import mongoose from "mongoose"

export const connectDB = async() => {
    console.log("Database connection with retry")
    try {
        await mongoose.connect(process.env.DATABASE_URI_AUTH!,{
            dbName:"auth"
        })
        console.log("connect to Auth Database")
    } catch (error) {
        console.error(error)
        setTimeout(() => {
            connectDB()
        }, 5000);
    }
}
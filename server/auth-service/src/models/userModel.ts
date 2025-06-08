import { Schema, Document, model} from "mongoose";

interface User extends Document {
    name:string,
    email:string,
    password:string,
    role:string,
    isVerified:boolean
}

const userSchema = new Schema<User>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        enum: ["user", "admin", "hotel_owner"]
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{ timestamps: true})

const User = model("user", userSchema)

export default User
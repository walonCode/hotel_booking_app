import User from "../models/userModel";
import { Response,Request } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userLogin, userRegister } from "../validators/userSchema";
import { sanitizedObject } from "../utils/sanitizedString";


export const login = async(req:Request, res:Response) => {
    try{
        const reqBody = req.body

        const result = userLogin.safeParse(reqBody)

        if (!result.success){
            console.error(result.error.message)
            res.status(400).json({message:"Invalid fields"})
        }
        
        const cleanInput = sanitizedObject(result)
        const { email, password } = cleanInput

        const user = await User.findOne({ email })
        if (!user){
            res.status(401).json({message:"Invalid email"})
        }

        const passwordMatched = await bcrypt.compare(password, user?.password!)
        if(!passwordMatched){
            res.status(401).json({message:"Invalid passowrd"})
        }

        if (!user?.isVerified){
            res.status(401).json({message:"Please verify your email address first"})
        }

        const token = jwt.sign({ id:user?._id!, name:user?.name!}, process.env.JWT_SECRET!, {
            expiresIn:"1d",
        })


        res.status(200).json({message:"Login successfull", token,})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}



export const register = async(req:Request, res:Response) => {
    try{
        const reqBody = req.body

        const result = userRegister.safeParse(reqBody)
        if (!result.success){
            console.error(result.error.message)
            res.status(400).json({message:"Invalid fields"})
        }

        const cleanInput = sanitizedObject(result)

        const { email, password ,role, name} = cleanInput
        const user = await User.findOne({ email })
        if (user){
            res.status(401).json({message:"User already exist"})
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password:passwordHashed,
            role
        })

        await newUser.save()

        res.status(201).json({message:"User registered"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}
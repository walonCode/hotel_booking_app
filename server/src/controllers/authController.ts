import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole } from "../models/User";
import bcrypt from 'bcryptjs';

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined");
}

const generateToken = (id: string | number, name:string) => {
  return jwt.sign(
    { id, name },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d"
    }
  );
};


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password:passwordHash,
      role: role || UserRole.USER
    });

    await user.save();

    res.status(201).json({
      message:"User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user?.password as string);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
    }


    res.json({
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      token: generateToken(user?._id as unknown as string, user?.name as string)
    }); 
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
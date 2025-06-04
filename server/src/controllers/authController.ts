import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole } from "../models/User";

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined");
}

const generateToken = (id: string | number) => {
  return jwt.sign(
    { id },
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
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || UserRole.USER
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as unknown as string)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as unknown as string)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
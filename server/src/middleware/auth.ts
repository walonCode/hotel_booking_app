import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";

interface User {
  id:string,
  name:string,
  role: string
}



export const protect = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded as User; // Type assertion her
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  res.status(401).json({ message: 'Not authorized, no token' });
};

export const authenticateUser = protect; // Alias for consistency
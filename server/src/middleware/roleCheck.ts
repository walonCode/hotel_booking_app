import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { UserRole } from '../models/User';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === UserRole.ADMIN) {
    next();
    return;
  }
  res.status(403).json({ message: 'Access denied. Admin privileges required.' });
};

export const isOwner = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === UserRole.OWNER || req.user?.role === UserRole.ADMIN) {
    next();
    return;
  }
  res.status(403).json({ message: 'Access denied. Owner privileges required.' });
};
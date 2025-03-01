import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1]; // Fix header access
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified; // Attach user object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

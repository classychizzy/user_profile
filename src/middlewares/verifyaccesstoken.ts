import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Access token not found' });
    


}
import { Request, Response, NextFunction } from 'express';
//import jwt from 'jsonwebtoken';
import { tokenVerfier } from '../utils/verifytoken';
import { User } from '../utils/interfaces';
//import { User } from '../utils/interfaces';
export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) res.status(401);
    // i need to see what this looks like
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Access token not found' });
    //verify the token using helper function
    const user = tokenVerfier.validateAccessToken(token);
    if (!user) return res.status(403).json({ error: 'Invalid access token' });
    req.user = user 
    return next();
}

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    // search for the refresh token in the request cookies`
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token not found' });

    const user = tokenVerfier.validateRefreshToken(refreshToken);
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });
    req.user = user;
    return next();
}


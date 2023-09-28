import jwt from 'jsonwebtoken';
import { tokenExistsInDb } from '../db/token';
import { User } from './interfaces';
// this could as well be directly implemented in the middleware but this is a better approach

export const tokenVerfier: any = {};
export const verifyToken = async (token: string, secret: string) => {
    let user = {};
    
    // find a way to make secret interchangeable like access token and refresh token
    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) return err;
        
        else {
            // if the token is valid, the user is returned
            user = decoded as User;
        }
    });
    return user;
}
 // to verify the access token
 tokenVerfier.validateAccessToken = async (token: string) => {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const user = await verifyToken(token, secret);
    return user;
 }
    // to verify the refresh token
    tokenVerfier.validateRefreshToken = async (token: string) => {
        const secret = process.env.REFRESH_TOKEN_SECRET as string;
        const user = await verifyToken(token, secret);
        return user;
    }
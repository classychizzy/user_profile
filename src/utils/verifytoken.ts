import jwt from 'jsonwebtoken';
import { tokenExistsInDb } from '../db/token';
import { User } from './interfaces';


/**i don't  fully understand this code so i just implmented a new one in verify accesstoken.ts
// until i understand this code and can decide which one is better`


const tokenVerfier = {};

const verifyToken = async (token: string, secret: string) => {
    let  user = {}
    jwt.verify(token, secret, { algorithms: ['HS256']}, (err, decoded) => {
        if (err) {
            return err
            

    }
    else {
        // if the token is valid, the user is returned
        user = decoded as User;
    
    }})
    return user;
}

tokenVerfier.validateAccessToken = async (token: string) => {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const user = await verifyToken(token, secret);
    return user;
}
**/

const tokenVerfier: any = {};
const verifyToken = async (token: string, secret: string) => {
    let user = {};
    
    // find a way to make secret interchangeable like access token and refresh token
    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            return err;
        }
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
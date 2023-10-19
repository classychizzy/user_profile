import jwt from 'jsonwebtoken';
import { tokenExistsInDb } from '../db/token';
import * as dotenv from 'dotenv';
import { User } from './interfaces';
// this could as well be directly implemented in the middleware but this is a better approach
// creating seperate functions to handle the refresh and access token verification
dotenv.config();

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
    // console.log(token);
    // console.log("ACCESS_TOKEN_SECRET");
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const user = await verifyToken(token, secret!);
    console.log(user);
    return user;
}
    // to verify the refresh token
tokenVerfier.validateRefreshToken = async (token: string) => {
    console.log("REFRESH_TOKEN_SECRET");
    console.log(process.env.REFRESH_TOKEN_SECRET);
    // const secret = process.env.REFRESH_TOKEN_SECRET;
    // const user = await verifyToken(token, secret);
    // return user;
}



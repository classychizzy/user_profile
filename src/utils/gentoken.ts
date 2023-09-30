//methods to generate access and refresh tokens
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { User } from './interfaces';
dotenv.config();


export const genAccessToken = (user: User) => {
    const {userId, email, username} = user;
    const accessToken = jwt.sign({userId, email, username},
       process.env['ACCESS_TOKEN_SECRET'] || 'secret',
       {expiresIn: '15m'
    });
        return accessToken;
};

export const genRefreshToken = (user: User) => {
    const {userId, email, username} = user;
    const expiresIn = '7d';
    //jwtid is used to identify the refresh token
    const refreshToken = jwt.sign({jwtid: userId, email, username},
        process.env['REFRESH_TOKEN_SECRET'] || 'secret', {
            expiresIn,
    });
        return refreshToken;
}


    
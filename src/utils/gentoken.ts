//methods to generate access and refresh tokens
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();


export const genAccessToken = (user: any) => {
    const {userId, email, username} = user;
    const accessToken = jwt.sign({userId, email, username},
       process.env.ACCESS_TOKEN_SECRET,
       {expiresIn: '15m'
    });
        return accessToken;
};

export const genRefreshToken = (user:any, tokenId:string) => {
    const {userId, email, username} = user;
    const refreshToken = jwt.sign({userId, email, username},
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'
    });
        return refreshToken;
}


    
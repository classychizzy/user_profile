import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
    const {id, email, username} = user;
    const accessToken = jwt.sign({id, email, username},
        process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'
    });
        return accessToken;
};

export const refreshToken = (user) => {
    const {id, email, username} = user;
    const refreshToken = jwt.sign({id, email, username},
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'
    });
        return refreshToken;
}
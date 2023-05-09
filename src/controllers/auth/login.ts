import db from '../../db/connect';
import { findByUsernameorEmail } from '../../db/users';
import { genAccessToken, genRefreshToken } from '../../utils/gentoken';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';
import { hashString } from '../../utils/hashString';

export const login = async (req: {
    body: any; user: any; 
}, res: any) => {
    try {
        if (!req.body.username) {
            return res.status(400).json({ error: "No Username provided" })
        } 
        
        if (!req.body.password) {
            return res.status(400).json({ error: "No Password provided" })
        }

        if (!req.body.email) {
            return res.status(400).json({ error: "No email provided" })
        }


        const {username, password } = req.body;

        // user can be validated by email or password
        const user = await findByUsernameorEmail(username, username);

        if (!user) {
            return res.status(404).json({error: "user not found"})
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({error: "Invalid credentials"})
        }

        const accesstoken = genAccessToken(user);
        const tokenId = randomUUID();
        const refreshToken = genRefreshToken(user, tokenId);

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/refresh_token',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

        addRefreshToken(tokenId, user.userId);

    } catch (err) {
        console.log(err);
        res.json({err: "failed to load user"})
    }
    
} 
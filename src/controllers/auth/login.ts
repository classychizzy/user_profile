import { findByUsernameorEmail } from '../../db/users';
import { addRefreshToken } from '../../db/token';
import { genAccessToken, genRefreshToken } from '../../utils/gentoken';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';



export const login = async (req: {
    body: any; user: any; 
}, res: any) => {
   
   
    
    try {
        if (!req.body.username || !req.body.email) {
            return res.status(400).json({ error: "No Username or email provided" })
        } 
        
        if (!req.body.password) {
            return res.status(400).json({ error: "No Password provided" })
        }

    // figure out how to make the req.body accept both username and email
        const {username, email, password }  = req.body;

        // user can be validated by email or password
        const user = await findByUsernameorEmail(username, email);

        if (!user) {
            return res.status(404).json({error: "user not found"})
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({error: "Invalid credentials"})
        }

        const accesstoken = genAccessToken(user);
        const tokenId = randomUUID();
        const refreshToken = genRefreshToken(user);

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/refresh_token',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

      // add refresh token to db
        addRefreshToken(tokenId, user.userId, refreshToken);
        return res.json({accesstoken, user});

    } catch (err) {
        console.log(err);
        res.json({err: "failed to load user"})
    }
    
} 
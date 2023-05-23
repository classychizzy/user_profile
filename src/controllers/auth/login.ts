import { findByUsernameorEmail } from '../../db/users';
import { addRefreshToken } from '../../db/token';
import { genAccessToken, genRefreshToken } from '../../utils/gentoken';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';




export const login = async (req: {
    body: any; user: any; 
}, res: any) => {
   
    const {username, email, password }  = req.body;
    if ((!username && !email) || !password) {
        return res.status(400).json({ message: 'Username or email and password are required' });
      }
    
      let loggedInUser;
    

    try {
    

        if (username) {
            loggedInUser = await findByUsernameorEmail(username, username);
           
        } else if (email) {
            loggedInUser = await findByUsernameorEmail(email, email);
            
        }
        
        if (!loggedInUser) {
            return res.status(401).json({error: "Invalid credentials"})
        }

        const match = await bcrypt.compare(password, loggedInUser.password);
        if (!match) {
            return res.status(401).json({error: "Invalid credentials"})
        }

        const accesstoken = genAccessToken(loggedInUser);
        const tokenId = randomUUID();
        const refreshToken = genRefreshToken(loggedInUser);

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/refresh_token',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

      // add refresh token to db
        addRefreshToken(tokenId, loggedInUser.userId, refreshToken);
        return res.json({accesstoken, loggedInUser});

    } catch (err) {
        console.log(err);
        res.json({err: "failed to load user"})
    }
    
} 

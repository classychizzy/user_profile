import { Response, NextFunction} from 'express';
import { findByUsernameorEmail} from '../db/users';

export const validateRegistration = async (req: any, res: Response, next:NextFunction) => {
    const {email, password, username} = req.body;

    if (!email) {
        return res.status(400).json({message: 'email is required'});
    }
    if (!password) {
        return res.status(400).json({message: 'password is required'});
    }
    if (!username) {
        return res.status(400).json({message: 'username is required'});
    }

    const user = await findByUsernameorEmail(username, email);
    if (user) {
       let error = 'user already exists';
       if (user.email !== email) {
              error = 'username already exists';
              return res.json({message: error});
         }
    }
        req.user = {
            email,
            username,
            password
        }

    next();
}
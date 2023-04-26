//authorization for the user registration
import db  from '../../db/connect';
import { hashString } from '../../utils/hashString';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    const user = await createUser(req.user)
    if (!user) {
        return res.json({error:'registration failed'})
    };

    const data = {
        username: user.username,
        email: user.email,
        userprofile: user.userprofile,
    };
    res.json(data)
};

const createUser = async (user) => {
    user.password = await hashString(user.password);
    return db.User.create(
        {
        data: user
    }
};
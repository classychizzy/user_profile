import { Request, Response, NextFunction } from 'express';
// check handles req param, validationresult handles errors
import { body, validationResult} from 'express-validator';

export const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   




   
    next();
}



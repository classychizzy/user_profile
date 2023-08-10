import {Request, Response, NextFunction } from 'express';

// check handles req param, validationresult handles errors
import { check, validationResult} from 'express-validator';
import { User } from '../utils/interfaces';


   //const { first_name, last_name, username, email, password, phone_number } = req.body;
    //console.log("req.body:", req.body);
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// used schema validation cause it was easier to implement
   export const validationRules = () => {
    check('first_name', 'First name is required').notEmpty().isString();
    check('last_name', 'Last name is required').notEmpty().isString();
    check('username', 'Username is required').notEmpty().isString();
    check('email', 'Email is required').notEmpty().isEmail();
    check('password', 'Password is required').notEmpty().isString().isLength({ min: 5 });
    check('phone_number', 'Phone number is required').notEmpty().isMobilePhone('any');
}

 export const requestError = (req: Request, res: Response, next: NextFunction) => {

   //error message is not displaying as expected
   const errors = validationResult(req);

   // if there are errors, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false,
             errors: errors.array() });
        }
   
        
   next();
   
    }



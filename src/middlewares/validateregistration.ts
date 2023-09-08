import { Request, Response, NextFunction } from "express";


import validator from "validator";
import { findByUsernameorEmail } from "../db/users";



//import { request } from "https";

// create a middleware that validates the req body
export const validateData = async (req: Request, res: Response, next: NextFunction) => {

    
        const { first_name, last_name, username, phone_number, email, password}  = req.body;
        // validate each of the properties of the user object
        
        if (!validator.isAlpha(first_name)) {
            return res.status(400).json({error: " first_name must be a string"});
           
        }
        if (!validator.isAlpha(last_name)) {
            return res.status(400).json({error:"last_name must be a string "})
        }
        if (!validator .isAlphanumeric(username)) {
            return res.status(400).json({error:"username should be alphanumeric"})
        }
        if (!validator.isMobilePhone(phone_number)) {
           return res.status(400).json({error:" must be a recognized number"})
        }
        if (!validator.isEmail(email)) {
            console.error("must be an actual email address")
        }
        if (!validator.isAlphanumeric(password)) {
            console.error("password must consist of string and numbers")
        }
// find a way to not save user credential if one of the validation fails
        const user = await findByUsernameorEmail(username, email);
        if (user) {
            let error = " email already exists"
            if (user.email !== email ) {
                error = "username already exists"
            }
            return res.json({error})

        }

        //
         next ();
    }
    


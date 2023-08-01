import {  findByUsernameorEmail } from '../../db/users';
// validation methods and middleware 
import { validationRules, validateError } from '../../middlewares/validateregistration';
import { createUser } from '../../db/users';
import { addRefreshToken } from '../../db/token';
import { genAccessToken, genRefreshToken } from '../../utils/gentoken';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import db from '../../db/connect';
import { hashString } from '../../utils/hashString';
import { ValidationError } from 'express-validator';

// user registration
export const register = async (req: Request, res: Response) => {
  
  // create a new user from the body of the request
   
   const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone_number: req.body.phone_number
   };
    
    try{
      // how to use schema validation before registering the user

      validationRules();
      // if validation  passed, hash the password and register the user
     
     // hash the password
      const hashedPassword = await hashString(data.password);
      const user = await createUser(data);
      console.log("user:", user);
      // figure out how to log errors from validation Error middleware.

    }
     catch (error ) {
        console.log('error in register', error);

        return res.status(500).json(error);
    } 
};

export const login = async (req: Request, res: Response) => {

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

export const updateUser = async (req: Request, res: Response) => {
 
    //hashed password is used instead to prevent security breach
    const { username, email,
      password, first_name, last_name,  phone_number } = req.body;
    
    //const { Id } = req.params;
    const { userId } = req.params;
  
  
    // if (isNaN(userID)) {
    //   return res.status(401).json({ message: 'user does not exist' });
    // }
  
    
      const user = await db.user.findUnique({
        where: {
          userId: userId,
        }
        
      });
      console.log(user)
  
  
      if (!user) {
        return res.status(401).json({ message: 'user does not exist' });
      }
  
  
  
    try {
      const dateTime = new Date();
      const hashedPassword = await hashString(user.password);
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(user.email)) {
        return res.status(401).json({ message: 'email is not valid' });
      }
  
  
      await db.user.update({
        where: {
          userId,
        },
        data: {
          // || undefined is used to avoid empty string i.e if a value is not added.
          first_name: first_name || undefined,
          last_name: last_name || undefined,
          phone_number: phone_number || undefined,
          username: username || undefined,
          email: email || undefined,
          updated_at: dateTime,
          password: hashedPassword || undefined,
          addressId: user.addressId,
          
          },
      }).then((response) => {
        if (response) {
          const result = {
            statusCode: 200,
            success: true,
            message: 'user updated successfully',
            data: response,
          };
          console.log(response);
          // returns old value instead consider fixing this
          return res.status(200).json(result);
          
        }
  
  
      })
  
     
  
      
    } catch (err: any) {
      const result = {
        statusCode: 500,
        success: false,
        message: 'user not updated',
        data: err.message,
      };
      return res.status(500).json(result);
    }
  };
  
  
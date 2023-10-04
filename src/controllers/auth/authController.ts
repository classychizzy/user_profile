import { findByUsernameorEmail } from '../../db/users';
// validation methods and middleware 
// import { requestError, validationRules } from '../../middlewares/validateregistration';
// import db from '../../db/connect';
import { createUser } from '../../db/users';
import { addRefreshToken, deleteRefreshToken } from '../../db/token';
import { genAccessToken, genRefreshToken } from '../../utils/gentoken';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import db from '../../db/connect';
import { hashString } from '../../utils/hashString';
import { tokenVerfier } from '../../utils/verifytoken';
//import { validateData } from '../../middlewares/validateregistration';



// user registration
export const register = async (req: Request, res: Response) => {
  
  const User = await createUser(req.body);
  // createuser automatically hashes the password then stores it in the db`
  if (!User) return res.json({error : "registration failed"})

  const data = {
    username: User.username,
    email: User.email,
    password: User.password,
    phone_number: User.phone_number,
  };
  res.json({ data});
  
  // create a new user from the body of the request
  // find a way to use schema validation before registering the user and hash password


    // how to use schema validation before registering the user
    //validation is not working



      // if validation  passed, hash the password and register the user
    
      // figure out how to log errors from validation Error middleware
      // find a way to not save user credential if one of the validation fails

      return res.status(200).json({ message: 'user created successfully' });
    }


export const login = async (req: Request, res: Response) => {

  const { username, email, password } = req.body;

   if ((!username && !email) || !password) {
    return res.status(400).json({ message: 'Username or email and password are required' });
  }
  // loggedinUser must exists in two states one that uses email and the other that uses
  // username.

  let loggedInUser;


  try {


    if (username) {
      loggedInUser = await findByUsernameorEmail(username, username);

    } else if (email) {
      loggedInUser = await findByUsernameorEmail(email, email);

    }

    if (!loggedInUser) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, loggedInUser.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
// a new access token is generated and sent to the user
    const accesstoken = genAccessToken(loggedInUser);
    const tokenId = randomUUID();
    // a new refresh token is generated and sent to the user
    const refreshToken = genRefreshToken(loggedInUser);

    res.cookie('refreshtoken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/refresh_token',
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    });

    // add refresh token to db
    addRefreshToken(tokenId, loggedInUser.userId, refreshToken);
    return res.json({ accesstoken, loggedInUser });

  } catch (err) {
    console.log(err);
    res.json({ err: "failed to load user" })
  }

}

// logout method
export const Logout = async (req: Request, res: Response) => {
const refresh_token = req.cookies.refreshtoken;
if (!refresh_token) return res.status(400).json({ error: "no refresh token" });
// doesn't check the db for the refresh token it verifies the token in session
const user = tokenVerfier.validateRefreshToken(refresh_token);
if (!user) return res.status(400).json({ error: "invalid refresh token" });


// delete refresh token from db
res.clearCookie('refreshtoken');
deleteRefreshToken(user.userId);
return res.status(200).json({ message: "logged out" });




}

export const updateUser = async (req: Request, res: Response) => {

  //hashed password is used instead to prevent security breach
  const { username, email,
    password, first_name, last_name, phone_number } = req.body;

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

export const getListOfUsers = async (req : Request, res: Response) => {

  const userIdParam = Number(req.params['userId']);
  const { userId } = req.body;

  console.log(userIdParam);
  console.log(userId);

  

  
  //const newTokenId = randomUUID();

  
  const result = {
    statusCode: 200,
    success: true,
    message: 'list of users',
    data: [],
  };
  
  return res.json(result);

};

// export const deleteUser = async (req: Request, res: Response) => {
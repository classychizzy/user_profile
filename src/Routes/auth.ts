import express from 'express';
import { validateError } from '../middlewares/validateregistration';
import { login, register, updateUser } from '../controllers/auth/authController';
import { updateAddress } from '../controllers/address/addressController';


export const Authrouter = express.Router();
/**
 * version 1 of the api
 * endpoints start with /api/v1
 * @example /api/v1
 * @returns welcome to userprofile api
 * '/register' endpoint for registering a user
 * curl localhost:3000/api/v1
 * healthcheck
 */

Authrouter.get('/', (req, res) => {
    res.send('welcome to userprofile api');
});
//registration endpoint
Authrouter.post('/register' ,validateError,register);
//login endpoint
Authrouter.post('/login', login)
// update user endpoint
Authrouter.put('/update/:userId', updateUser);
// update address endpoint
Authrouter.put('/update/address/:userId', updateAddress);

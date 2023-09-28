import express from 'express';
import { validateData } from '../middlewares/validateregistration';
// authentication middleware
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/verifytokens';
import { refreshAccessToken } from '../controllers/auth/refreshToken';
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
//registration endpoint, call the express-validator chain method here
Authrouter.post('/register', validateData, register);
//login endpoint
Authrouter.post('/login', login)
//list all users
Authrouter.get('/users', verifyAccessToken,) // not yet implemented
// update user endpoint
Authrouter.put('/update/:userId', updateUser);
// update address endpoint
Authrouter.put('/update/address/:userId', updateAddress);

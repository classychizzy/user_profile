import express from 'express';
import { register } from '../controllers/auth/register';

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
Authrouter.post('/register', register);
//login endpoint
Authrouter.post('/login', )

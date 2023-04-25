import express from 'express';

const router = express.router();

router.post('/auth/login', login);
router.post('/auth/register', register);
router.get("/auth/refresh", refresh);
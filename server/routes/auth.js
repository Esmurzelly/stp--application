import { Router } from 'express';
import { register, login, getMe, editProfile } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// register
// http://localhost:3001/api/auth/register
router.post('/register', register);

// login
// http://localhost:3001/api/auth/login
router.post('/login', login);

router.put('/', checkAuth, editProfile);

// getMe
// http://localhost:3001/api/auth/getMe
router.get('/me', checkAuth, getMe);

export default router;

import { Router } from 'express';
import { register, login, getMe, editProfile, uploadAvatar, deleteAvatar, sendEmail } from '../controllers/auth.js';
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


// avatar upload
router.post('/avatar', checkAuth, uploadAvatar) 

// avatar delete
router.delete('/avatar', checkAuth, deleteAvatar) 

// sending email
router.post('/contact', sendEmail) 

export default router;

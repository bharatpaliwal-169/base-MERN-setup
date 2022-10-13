import express from 'express';
import {login,signup,oauth} from '../controllers/auth.js';
import {sendEmail} from '../controllers/email.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/oauth', oauth);
router.post('/email',sendEmail);

export default router;
import express from 'express';
import {login,signup,oauth} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/oauth', oauth);

export default router;
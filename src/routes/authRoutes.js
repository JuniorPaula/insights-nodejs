import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = new Router();

router.get('/login', authController.login);
router.get('/register', authController.register);
router.post('/register', authController.authRegister);

export default router;

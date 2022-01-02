import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = new Router();

router.get('/login', authController.login);
router.post('/login', authController.authLogin);
router.get('/register', authController.register);
router.post('/register', authController.authRegister);
router.get('/logout', authController.logout);

export default router;

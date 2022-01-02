import { Router } from 'express';

import homeController from '../controllers/HomeController';

import { checkIsLogged } from '../middlewares/middleware';

const router = new Router();

router.get('/', homeController.index);
router.get('/dashboard', checkIsLogged, homeController.dashboard);
router.get('/add', checkIsLogged, homeController.createInsights);

export default router;

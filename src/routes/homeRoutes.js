import { Router } from 'express';

import homeController from '../controllers/HomeController';

import { checkIsLogged } from '../middlewares/middleware';

const router = new Router();

router.get('/', homeController.index);
router.get('/dashboard', checkIsLogged, homeController.dashboard);
router.get('/add', checkIsLogged, homeController.createInsights);
router.post('/add', checkIsLogged, homeController.store);
router.get('/edit/:id', checkIsLogged, homeController.updateInsight);
router.post('/edit', checkIsLogged, homeController.update);
router.post('/delete', checkIsLogged, homeController.delete);

export default router;

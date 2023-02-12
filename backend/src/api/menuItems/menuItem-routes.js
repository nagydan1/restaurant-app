import express from 'express';
import menuItemController from './menuItem-controller';

const router = express.Router();

router.get('/menu', menuItemController.get);

export default router;

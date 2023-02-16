import express from 'express';
import cors from 'cors';

import menuItems from './menuItems/menuItem-routes';
import orders from './orders/order-routes';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(menuItems);
router.use(orders);

export default router;

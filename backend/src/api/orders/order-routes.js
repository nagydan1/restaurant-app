import express from 'express';
import orderController from './order-controller';

const router = express.Router();

router.post('/order', orderController.post);

export default router;

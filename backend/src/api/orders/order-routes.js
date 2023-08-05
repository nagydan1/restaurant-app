import express from 'express';
import orderController from './order-controller';

const router = express.Router();

router.get('/order', orderController.get);
router.post('/order', orderController.post);

export default router;

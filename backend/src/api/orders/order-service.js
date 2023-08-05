import { isValidObjectId } from 'mongoose';
import Order from './order-model';
import HttpError from '../../utils/HttpError';

const orderService = {
  getOrders() {
    return Order.find({});
  },
  async createOrder(req) {
    const { cart } = req.body;

    if (cart.length < 1) {
      throw new HttpError('At least one cart item is required.', 400);
    }
    if (cart.some((item) => item.menuItemId === undefined)) {
      throw new HttpError('Missing cart item ID.', 400);
    }
    if (cart.some((item) => !isValidObjectId(item.menuItemId))) {
      throw new HttpError('Invalid item ID.', 400);
    }
    if (cart.some((item) => item.quantity === undefined)) {
      throw new HttpError('Missing cart item quantity.', 400);
    }
    if (cart.some((item) => item.quantity < 1)
      || cart.some((item) => !Number.isInteger(item.quantity))) {
      throw new HttpError('Invalid item quantity.', 400);
    }
    try {
      const newOrder = new Order(req.body);
      const dbRes = await newOrder.save();
      return (dbRes.cart.length === cart.length);
    } catch (error) {
      error.message = 'Server error.';
      error.status = 500;
      throw error;
    }
  },
};

export default orderService;

import orderService from './order-service';

const orderController = {
  async get(req, res, next) {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  },
  async post(req, res, next) {
    try {
      const isSaved = await orderService.createOrder(req);
      const message = isSaved ? 'Saved successfully' : 'Save failed';
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;

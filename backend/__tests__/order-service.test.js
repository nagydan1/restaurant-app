import Order from '../src/api/orders/order-model';
import HttpError from '../src/utils/HttpError';
import orderService from '../src/api/orders/order-service';
import { mockOrderList, mockSavedOrder, mockDeleteDbRes } from '../__mocks__/mockOrders';

jest.mock('../src/api/orders/order-model');

describe('Order service\'s getOrders method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return orders from database', async () => {
    Order.find.mockReturnValue(mockOrderList);
    const data = await orderService.getOrders();
    expect(data).toEqual(mockOrderList);
  });
});

describe('Order service\'s createOrder method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if cart is empty', async () => {
    expect.assertions(3);
    const req = { body: { cart: [] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('At least one cart item is required.');
    }
  });

  it('should throw an error if cart item ID is missing', async () => {
    expect.assertions(3);
    const req = { body: { cart: [{ quantity: 0 }] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('Missing cart item ID.');
    }
  });

  it('should throw an error if cart item ID is invalid', async () => {
    expect.assertions(3);
    const req = { body: { cart: [{ menuItemId: 'xxx', quantity: 1 }] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('Invalid item ID.');
    }
  });

  it('should throw an error if cart item quantity is missing', async () => {
    expect.assertions(3);
    const req = { body: { cart: [{ menuItemId: '64cbfa8d374cc882cc7a156e' }] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('Missing cart item quantity.');
    }
  });

  it('should throw an error if cart item quantity is invalid', async () => {
    expect.assertions(3);
    const req = { body: { cart: [{ menuItemId: '64cbfa8d374cc882cc7a156e', quantity: 0 }] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('Invalid item quantity.');
    }
  });

  it('should throw an error if cart item quantity is invalid', async () => {
    expect.assertions(3);
    const req = { body: { cart: [{ menuItemId: '64cbfa8d374cc882cc7a156e', quantity: 0.2 }] } };
    try {
      await orderService.createOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(400);
      expect(err.message).toBe('Invalid item quantity.');
    }
  });

  it('should return true if order is saved', async () => {
    const req = { body: { cart: [{ menuItemId: '64cbfa8d374cc882cc7a156e', quantity: 2 }] } };
    Order.prototype.save.mockReturnValue(mockSavedOrder);
    const data = await orderService.createOrder(req);
    expect(data).toEqual(true);
  });
});

describe('Order service\'s deleteOrder method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if order ID is not valid', async () => {
    expect.assertions(3);
    const req = { params: { orderId: 'xxx' } };
    try {
      await orderService.deleteOrder(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(404);
      expect(err.message).toBe('Order ID is not valid.');
    }
  });

  it('should return appropriate object if order is deleted', async () => {
    const req = { params: { orderId: '64cff0405aa7cf2b83ea3c4d' } };
    Order.deleteOne.mockResolvedValueOnce(mockDeleteDbRes);
    const data = await orderService.deleteOrder(req);
    expect(data).toEqual(mockDeleteDbRes);
  });
});

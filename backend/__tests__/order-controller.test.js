import orderService from '../src/api/orders/order-service';
import orderController from '../src/api/orders/order-controller';
import { mockDeleteDbRes } from '../__mocks__/mockOrders';

jest.mock('../src/api/orders/order-service');

const req = { params: { orderId: '64cff0405aa7cf2b83ea3c4d' } };

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNext = jest.fn();

describe('Order controller\'s get method', () => {
  it('should call next with error thrown by service', async () => {
    const err = new Error('Something went wrong');
    orderService.getOrders.mockRejectedValueOnce(err);
    await orderController.get(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  it('should return orders saved in the database', async () => {
    const data = 'fakeData';
    orderService.getOrders.mockResolvedValueOnce(data);
    await orderController.get(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ orders: data });
    expect(mockRes.json).toBeCalledTimes(1);
  });
});

describe('Order controller\'s post method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next with error thrown by service', async () => {
    const err = new Error('Something went wrong again');
    orderService.createOrder.mockRejectedValueOnce(err);
    await orderController.post(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  it('should return success message', async () => {
    orderService.createOrder.mockResolvedValueOnce(true);
    await orderController.post(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'Saved successfully' });
    expect(mockRes.json).toBeCalledTimes(1);
  });
});

describe('Order controller\'s delete method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next with error thrown by service', async () => {
    const err = new Error('Something always goes wrong');
    orderService.deleteOrder.mockRejectedValueOnce(err);
    await orderController.delete(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  it('should return success message of order is deleted', async () => {
    orderService.deleteOrder.mockResolvedValueOnce(mockDeleteDbRes);
    await orderController.delete(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'Deleted successfully', _id: mockDeleteDbRes._id });
    expect(mockRes.json).toBeCalledTimes(1);
  });
});

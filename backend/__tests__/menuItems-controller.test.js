import menuItemService from '../src/api/menuItems/menuItem-service';
import menuItemController from '../src/api/menuItems/menuItem-controller';

jest.mock('../src/api/menuItems/menuItem-service');

const req = {};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNext = jest.fn();

describe('MenuItem controller\'s get method', () => {
  it('should call next with error thrown by service', async () => {
    const err = new Error('Something went wrong');
    menuItemService.getMenuItems.mockRejectedValueOnce(err);
    await menuItemController.get(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  it('should return menu from the database', async () => {
    const data = 'fakeData';
    menuItemService.getMenuItems.mockResolvedValueOnce(data);
    await menuItemController.get(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ menuItems: data });
    expect(mockRes.json).toBeCalledTimes(1);
  });
});

import MenuItem from '../src/api/menuItems/menuItem-model';
import menuItemService from '../src/api/menuItems/menuItem-service';
import { mockMenuItems } from '../__mocks__/mockMenuItems';

jest.mock('../src/api/menuItems/menuItem-model');

describe('MenuItem service\'s getMenuItems method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return menu from database', async () => {
    MenuItem.find.mockReturnValue(mockMenuItems);
    const data = await menuItemService.getMenuItems();
    expect(data).toEqual(mockMenuItems);
  });
});

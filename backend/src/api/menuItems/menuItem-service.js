import MenuItem from './menuItem-model';

const menuItemService = {
  getMenuItems() {
    return MenuItem.find({});
  },
};

export default menuItemService;

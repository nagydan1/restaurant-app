import menuItemService from './menuItem-service';

const menuItemController = {
  async get(req, res, next) {
    try {
      const menuItems = await menuItemService.getMenuItems();
      res.status(200).json({ menuItems });
    } catch (error) {
      next(error);
    }
  },
};

export default menuItemController;

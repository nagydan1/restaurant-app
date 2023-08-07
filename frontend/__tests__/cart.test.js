/* eslint-disable jest/no-mocks-import */
import configureStore from '../src/store/configureStore';
import {
  itemAdded,
  quantityIncremented,
  quantityDecremented,
  itemRemoved,
  allItemsRemoved,
  sendOrder,
  getCartCount,
} from '../src/store/cart';
import { loadMenu } from '../src/store/menu';
import mockMenu from '../__mocks__/mockMenu';
import mockCart from '../__mocks__/mockCart';
import server from '../__mocks__/mockServer';

describe('Cart slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  const cartSlice = () => store.getState().cart;
  const menuItemId = { menuItemId: '64cbfa8d374cc882cc7a156e' };

  describe('Item should be added to cart', () => {
    beforeEach(async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMenu),
      });
      global.fetch = mockFetch;

      await store.dispatch(loadMenu());
    });

    it('with 1 quantity if item is not in cart', () => {
      store.dispatch(itemAdded(menuItemId));

      expect(cartSlice().items).toHaveLength(1);
      expect(cartSlice().items[0].quantity).toEqual(1);
    });

    it('and quantity should be incremented if item is already in cart', () => {
      store.dispatch(itemAdded(menuItemId));
      store.dispatch(itemAdded(menuItemId));

      expect(cartSlice().items).toHaveLength(1);
      expect(cartSlice().items[0].quantity).toEqual(2);
    });
  });

  describe('Interactions', () => {
    beforeEach(async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMenu),
      });
      global.fetch = mockFetch;

      await store.dispatch(loadMenu());
      store.dispatch(itemAdded(menuItemId));
    });

    describe('Quantity', () => {
      it('should be incremented', () => {
        store.dispatch(quantityIncremented(menuItemId));

        expect(cartSlice().items[0].quantity).toEqual(2);
      });

      it('should be decremented', () => {
        store.dispatch(quantityIncremented(menuItemId));
        store.dispatch(quantityDecremented(menuItemId));

        expect(cartSlice().items[0].quantity).toEqual(1);
      });

      it('should not be decremented below 1', () => {
        store.dispatch(quantityDecremented(menuItemId));

        expect(cartSlice().items[0].quantity).toEqual(1);
      });
    });

    describe('Remove', () => {
      beforeEach(() => {
        store.dispatch(itemAdded({ menuItemId: '64cbfa8d374cc882cc7a1580' }));
      });

      it('one item should remove the item', () => {
        store.dispatch(itemRemoved(menuItemId));

        expect(cartSlice().items).toHaveLength(1);
        expect(cartSlice().items[0].menuItemId).toEqual('64cbfa8d374cc882cc7a1580');
      });
      it('all items', () => {
        store.dispatch(allItemsRemoved(menuItemId));
        expect(cartSlice().items).toHaveLength(0);
      });
    });
  });

  describe('Send order', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Order should be sent to the the server and the store should be emptied', async () => {
      await store.dispatch(loadMenu());
      store.dispatch(itemAdded(menuItemId));
      await store.dispatch(sendOrder());

      expect(cartSlice().items).toHaveLength(0);
    });

    it('Feedback should appear if the order is saved', async () => {
      await store.dispatch(loadMenu());
      store.dispatch(itemAdded(menuItemId));
      await store.dispatch(sendOrder());

      expect(cartSlice().feedback.message).toEqual('Saved successfully');
    });
  });

  describe('selecors', () => {
    it('getCartCount', () => {
      const result = getCartCount(mockCart.items);
      expect(result).toEqual(4);
    });
  });
});

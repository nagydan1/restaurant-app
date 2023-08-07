/* eslint-disable jest/no-mocks-import */
import configureStore from '../src/store/configureStore';
import { loadOrder, deleteOrder } from '../src/store/order';
import { mockOrders, mockErrorFeedback } from '../__mocks__/mockOrders';
import server from '../__mocks__/mockServer';

describe('order slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  const orderSlice = () => store.getState().order;

  describe('Order', () => {
    it('Orders should be fetched from the server and put in the store', async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockOrders),
      });
      global.fetch = mockFetch;

      await store.dispatch(loadOrder());

      expect(orderSlice().orderItems).toEqual(mockOrders.orders);
    });

    describe('Loading indicator', () => {
      it('should be true while fetching orders', () => {
        const mockFetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockOrders),
        });
        global.fetch = mockFetch;

        store.dispatch(loadOrder());

        expect(orderSlice().loading).toBe(true);
      });

      it('should be false after the bugs are fetched', async () => {
        const mockFetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockOrders),
        });
        global.fetch = mockFetch;

        await store.dispatch(loadOrder());

        expect(orderSlice().loading).toBe(false);
      });

      it('should be false if the server is unavailable', async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
        global.fetch = mockFetch;

        await store.dispatch(loadOrder());

        expect(orderSlice().loading).toBe(false);
      });
    });

    describe('Feedback', () => {
      it('should appear if the server is unavailable', async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
        global.fetch = mockFetch;

        await store.dispatch(loadOrder());

        expect(orderSlice().feedback).toEqual(mockErrorFeedback.feedback);
      });
    });
  });

  describe('Delete order', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Order should be deleted from the server and the store', async () => {
      await store.dispatch(loadOrder());
      await store.dispatch(deleteOrder('64cff2a6062820f8fe1d5717'));

      expect(orderSlice().orderItems).toHaveLength(1);
    });

    it('Feedback should appear if the order is deleted', async () => {
      await store.dispatch(loadOrder());
      await store.dispatch(deleteOrder('64cff2a6062820f8fe1d5717'));

      expect(orderSlice().feedback.message).toEqual('Deleted successfully');
    });
  });
});

/* eslint-disable jest/no-mocks-import */
import configureStore from '../src/store/configureStore';
import { loadMenu, getMenuItemById } from '../src/store/menu';
import mockMenu from '../__mocks__/mockMenu';

describe('menu slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  const menuSlice = () => store.getState().menu;

  describe('if the menu exists in the cache', () => {
    it('should not be fetched from the server again', async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMenu),
      });
      global.fetch = mockFetch;

      await store.dispatch(loadMenu());
      await store.dispatch(loadMenu());

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("if the menu doesn't exist in the cache", () => {
    it('should be fetched from the server and put in the store', async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMenu),
      });
      global.fetch = mockFetch;

      await store.dispatch(loadMenu());

      expect(menuSlice().menuItems).toEqual(mockMenu.menuItems);
    });

    describe('loading indicator', () => {
      it('should be true while fetching the menu', () => {
        const mockFetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockMenu),
        });
        global.fetch = mockFetch;

        store.dispatch(loadMenu());

        expect(menuSlice().loading).toBe(true);
      });

      it('should be false after the bugs are fetched', async () => {
        const mockFetch = jest.fn().mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockMenu),
        });
        global.fetch = mockFetch;

        await store.dispatch(loadMenu());

        expect(menuSlice().loading).toBe(false);
      });

      it('should be false if the server is unavailable', async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
        global.fetch = mockFetch;

        await store.dispatch(loadMenu());

        expect(menuSlice().loading).toBe(false);
      });
    });
  });

  describe('selecors', () => {
    it('getMenuItemById', () => {
      const result = getMenuItemById('64cbfa8d374cc882cc7a156e')(mockMenu);
      expect(result).toHaveLength(1);
    });
  });
});

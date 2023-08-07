import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockOrders } from './mockOrders';
import mockMenu from './mockMenu';
import { BACKEND_URL } from '../src/constants';

const handlers = [
  rest.get(`${BACKEND_URL}/api/menu`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockMenu),
    );
  }),
  rest.get(`${BACKEND_URL}/api/order`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockOrders),
    );
  }),
  rest.post(`${BACKEND_URL}/api/order`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Saved successfully' }),
    );
  }),
  rest.delete(`${BACKEND_URL}/api/order/:orderId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Deleted successfully',
        _id: '64cff2a6062820f8fe1d5717',
      }),
    );
  }),
];

const server = setupServer(...handlers);

export default server;

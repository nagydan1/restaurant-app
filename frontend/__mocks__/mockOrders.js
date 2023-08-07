export const mockOrders = {
  orders: [
    {
      _id: '64cff2a6062820f8fe1d5717',
      cart: [
        {
          menuItemId: '64cbfa8d374cc882cc7a1570',
          quantity: '2',
          _id: '64cff2a6062820f8fe1d5718',
        },
        {
          menuItemId: '64cbfa8d374cc882cc7a157f',
          quantity: '4',
          _id: '64cff2a6062820f8fe1d5719',
        },
      ],
      __v: 0,
    },
    {
      _id: '64d12c7ab97ea363db42a0e3',
      cart: [
        {
          menuItemId: '64cbfa8d374cc882cc7a156e',
          quantity: '1',
          _id: '64d12c7ab97ea363db42a0e4',
        },
      ],
      __v: 0,
    },
  ],
};

export const mockErrorFeedback = {
  feedback: {
    severity: 'error',
    message: 'Failed to fetch',
  },
};

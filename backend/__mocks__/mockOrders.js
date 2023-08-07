import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const mockOrderList = {
  orders: [
    {
      _id: '64cff0095d6353f92f08e450',
      cart: [
        {
          menuItemId: '64cbfa8d374cc882cc7a156e',
          quantity: '1',
          _id: '64cff0095d6353f92f08e451',
        },
      ],
      __v: 0,
    },
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
  ],
};

export const mockSavedOrder = {
  _id: new ObjectId('64cff0095d6353f92f08e450'),
  cart: [
    {
      menuItemId: new ObjectId('64cbfa8d374cc882cc7a156e'),
      quantity: 1,
      _id: new ObjectId('64cff0095d6353f92f08e451'),
    },
  ],
  __v: 0,
};

export const mockDeleteDbRes = {
  acknowledged: true,
  deletedCount: 1,
  _id: '64cff0405aa7cf2b83ea3c4d',
};

import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menuItem',
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  cart: [CartItemSchema],
});

export default mongoose.model('order', OrderSchema);

import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['starter', 'salad', 'meat', 'fish', 'pasta', 'pizza'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('menuItem', MenuItemSchema);

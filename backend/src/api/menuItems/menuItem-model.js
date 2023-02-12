import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  spanish: {
    type: String,
    required: true,
  },
  english: {
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

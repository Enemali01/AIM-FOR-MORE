import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const popularSchema = new Schema({
  product: {
    name: { type: String },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  image: {
    type: String,
    required: true, // This image can be a custom banner or highlight image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Popular = model('popularProduct', popularSchema);

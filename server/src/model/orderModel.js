// models/order.js
import mongoose, { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
  ItemId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, min: 1 },
  file: String,
});

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  items: Array,
  bill: Number,
  address: String,
  phone: String,
  payment: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });


export const Order = model('order', orderSchema);

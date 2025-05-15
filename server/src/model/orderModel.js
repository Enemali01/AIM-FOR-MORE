import mongoose, { Schema, model } from 'mongoose';

// Define order item sub-schema
const orderItemSchema = new Schema({
  ItemId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, min: 1 },
  file: String,
});

// Define main order schema
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  items: [orderItemSchema], 
  bill: Number,
  address: String,
  phone: String,
  payment: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'completed'],
    default: 'pending',},// set default to 'pemding'
  estimatedDelivery: Date 
}, { timestamps: true });

export const Order = model('order', orderSchema);

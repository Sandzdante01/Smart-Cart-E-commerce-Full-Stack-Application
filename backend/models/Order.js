import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Custom string IDs (e.g., 'SC-2026-1024')
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  date: { type: String, required: true },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  address: { type: String, required: true },
  estimatedDelivery: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

OrderSchema.virtual('id').get(function() {
  return this._id;
});

export const Order = mongoose.model('Order', OrderSchema);

import mongoose from 'mongoose';

const SpecificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Store custom string IDs (e.g., 'p-001')
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  badge: { type: String, default: '' },
  sku: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Draft', 'Out of Stock'], default: 'Active' },
  description: { type: String, required: true },
  images: [{ type: String }],
  specs: [SpecificationSchema],
  sales: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  flashSale: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual getter to return id instead of _id to match frontend types
ProductSchema.virtual('id').get(function() {
  return this._id;
});

export const Product = mongoose.model('Product', ProductSchema);

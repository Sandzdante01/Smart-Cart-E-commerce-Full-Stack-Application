import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Custom IDs like 'c-1'
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  productCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CategorySchema.virtual('id').get(function() {
  return this._id;
});

export const Category = mongoose.model('Category', CategorySchema);

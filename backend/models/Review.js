import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Custom string IDs like 'r-1'
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  customerName: { type: String, required: true },
  customerInitials: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Published', 'Pending'], default: 'Published' },
  verified: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ReviewSchema.virtual('id').get(function() {
  return this._id;
});

export const Review = mongoose.model('Review', ReviewSchema);

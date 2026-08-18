import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Custom string IDs like 'n-1'
  type: { type: String, enum: ['order', 'stock', 'delivery', 'customer'], required: true },
  message: { type: String, required: true },
  time: { type: String, required: true },
  read: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

NotificationSchema.virtual('id').get(function() {
  return this._id;
});

export const Notification = mongoose.model('Notification', NotificationSchema);

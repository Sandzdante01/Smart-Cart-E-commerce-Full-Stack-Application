import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AddressSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  line1: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Store custom string IDs (e.g., 'u-1')
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  location: { type: String, default: '' },
  avatarInitials: { type: String, default: '' },
  joined: { type: String, required: true },
  addresses: [AddressSchema]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual getter to return id instead of _id to match frontend types
UserSchema.virtual('id').get(function() {
  return this._id;
});

// Pre-save hook to hash passwords
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema);

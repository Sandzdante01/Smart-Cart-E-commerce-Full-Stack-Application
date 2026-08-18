import express from 'express';
import { Review } from '../models/Review.js';
import { Product } from '../models/Product.js';

const router = express.Router();

// Helper to update product ratings and review count
const updateProductRating = async (productId) => {
  try {
    const productReviews = await Review.find({ productId });
    const reviewCount = productReviews.length;
    const avgRating = reviewCount > 0 
      ? Math.round((productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
      : 0;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      reviews: reviewCount
    });
  } catch (err) {
    console.error('Error updating product rating:', err);
  }
};

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a review
router.post('/', async (req, res) => {
  const { productId, productName, customerName, customerInitials, rating, title, body } = req.body;

  try {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const reviewId = `r-${Date.now()}`;
    const review = await Review.create({
      _id: reviewId,
      productId,
      productName,
      customerName,
      customerInitials,
      rating,
      title,
      body,
      date: dateStr,
      status: 'Published',
      verified: true
    });

    // Update product stats
    await updateProductRating(productId);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(req.params.id);

    // Update product stats
    await updateProductRating(productId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

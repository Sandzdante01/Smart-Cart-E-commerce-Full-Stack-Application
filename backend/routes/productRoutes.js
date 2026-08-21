import express from 'express';
import { Product } from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper to slugify a string
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// Create a new product
router.post('/', async (req, res) => {
  const { name, brand, category, price, originalPrice, stock, badge, sku, description, images, specs, featured, flashSale, status } = req.body;

  try {
    const slug = slugify(name);
    // Ensure slug uniqueness
    const existing = await Product.findOne({ slug });
    let finalSlug = slug;
    if (existing) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const productId = `p-${Date.now()}`;
    const product = await Product.create({
      _id: productId,
      slug: finalSlug,
      name,
      brand,
      category,
      price,
      originalPrice: originalPrice || price,
      rating: 0,
      reviews: 0,
      stock: stock || 0,
      badge: badge || '',
      sku,
      status: status || 'Active',
      description,
      images: images || [],
      specs: specs || [],
      sales: 0,
      featured: featured || false,
      flashSale: flashSale || false
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If name is changed, update slug
    if (req.body.name && req.body.name !== product.name) {
      const slug = slugify(req.body.name);
      const existing = await Product.findOne({ slug });
      req.body.slug = existing ? `${slug}-${Date.now()}` : slug;
    }

    // If price changes and originalPrice is not specified, update it or keep it
    if (req.body.price && !req.body.originalPrice) {
      if (product.originalPrice < req.body.price) {
        req.body.originalPrice = req.body.price;
      }
    }

    // Apply updates
    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

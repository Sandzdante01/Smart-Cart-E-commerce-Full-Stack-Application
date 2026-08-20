import express from 'express';
import { Category } from '../models/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
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
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Create a category
router.post('/', async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const slug = slugify(name);
    const existing = await Category.findOne({ slug });
    let finalSlug = slug;
    if (existing) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const categoryId = `c-${Date.now()}`;
    const category = await Category.create({
      _id: categoryId,
      name,
      slug: finalSlug,
      productCount: 0,
      image: image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      description: description || ''
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.patch('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (req.body.name && req.body.name !== category.name) {
      const slug = slugify(req.body.name);
      const existing = await Category.findOne({ slug });
      req.body.slug = existing ? `${slug}-${Date.now()}` : slug;
    }

    Object.assign(category, req.body);
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

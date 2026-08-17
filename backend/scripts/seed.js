import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { Review } from '../models/Review.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_DATA_DIR = path.join(__dirname, '../../frontend/src/data');
const TEMP_DIR = path.join(__dirname, 'temp');

// Helper to clean TS features and convert to valid ES Module JS
function cleanTS(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Strip import type statements
  content = content.replace(/import\s+type\s+[^;]+;/g, '');
  // Strip export type statements
  content = content.replace(/export\s+type\s+[^;]+;/g, '');
  // Strip type assertions like "as const", "as string"
  content = content.replace(/\s+as\s+const\b/g, '');
  content = content.replace(/\s+as\s+string\b/g, '');
  // Strip variable type annotations (e.g. const categories: Category[] = )
  content = content.replace(/:\s*[A-Z][a-zA-Z]*(\[\])?\s*=/g, ' =');
  // Fix imports to append .js
  content = content.replace(/from\s+['"]\.\/products['"]/g, "from './products.js'");
  
  return content;
}

async function runSeed() {
  try {
    await connectDB();

    console.log('Clearing database...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Notification.deleteMany({});
    console.log('Database cleared.');

    // Create temp directory for JS seed files
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR);
    }

    // Clean and write files to temp directory
    const filesToConvert = ['products.ts', 'categories.ts', 'users.ts', 'reviews.ts', 'orders.ts'];
    for (const file of filesToConvert) {
      const srcPath = path.join(FRONTEND_DATA_DIR, file);
      const destPath = path.join(TEMP_DIR, file.replace('.ts', '.js'));
      const cleaned = cleanTS(srcPath);
      fs.writeFileSync(destPath, cleaned, 'utf8');
    }

    console.log('Importing seed data from cleaned JS files...');
    // Dynamically import the clean JS files
    const { products } = await import('./temp/products.js');
    const { categories } = await import('./temp/categories.js');
    const { demoUsers } = await import('./temp/users.js');
    const { reviews, initialNotifications } = await import('./temp/reviews.js');
    const { orders } = await import('./temp/orders.js');

    // 1. Seed Categories
    console.log(`Seeding ${categories.length} categories...`);
    const categoryDocs = categories.map(c => ({
      _id: c.id,
      name: c.name,
      slug: c.slug,
      productCount: c.productCount,
      image: c.image,
      description: c.description
    }));
    await Category.insertMany(categoryDocs);

    // 2. Seed Products
    console.log(`Seeding ${products.length} products...`);
    const productDocs = products.map(p => ({
      _id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating,
      reviews: p.reviews,
      stock: p.stock,
      badge: p.badge || '',
      sku: p.sku,
      status: p.status,
      description: p.description,
      images: p.images,
      specs: p.specs,
      sales: p.sales || 0,
      featured: !!p.featured,
      flashSale: !!p.flashSale
    }));
    await Product.insertMany(productDocs);

    // 3. Seed Users (with hashing)
    console.log(`Seeding ${demoUsers.length} users...`);
    for (const u of demoUsers) {
      await User.create({
        _id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        password: 'smartcart', // Default password for all seed accounts
        role: u.role,
        location: u.location || '',
        avatarInitials: u.avatarInitials || '',
        joined: u.joined,
        addresses: u.addresses || []
      });
    }

    // 4. Seed Reviews
    console.log(`Seeding ${reviews.length} reviews...`);
    const reviewDocs = reviews.map(r => ({
      _id: r.id,
      productId: r.productId,
      productName: r.productName,
      customerName: r.customerName,
      customerInitials: r.customerInitials,
      rating: r.rating,
      title: r.title,
      body: r.body,
      date: r.date,
      status: r.status,
      verified: !!r.verified
    }));
    await Review.insertMany(reviewDocs);

    // 5. Seed Orders
    console.log(`Seeding ${orders.length} orders...`);
    const orderDocs = orders.map(o => ({
      _id: o.id,
      customerId: o.customerId,
      customerName: o.customerName,
      date: o.date,
      items: o.items.map(item => ({
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: o.subtotal,
      discount: o.discount,
      shipping: o.shipping,
      total: o.total,
      payment: o.payment,
      status: o.status,
      address: o.address,
      estimatedDelivery: o.estimatedDelivery
    }));
    await Order.insertMany(orderDocs);

    // 6. Seed Notifications
    console.log(`Seeding ${initialNotifications.length} notifications...`);
    const notificationDocs = initialNotifications.map(n => ({
      _id: n.id,
      type: n.type,
      message: n.message,
      time: n.time,
      read: !!n.read
    }));
    await Notification.insertMany(notificationDocs);

    console.log('Database successfully seeded!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        console.log('Temporary conversion files cleared.');
      }
    } catch (err) {
      console.error('Error cleaning up temp directory:', err.message);
    }
    
    mongoose.connection.close();
  }
}

runSeed();

import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';

// Load environment variables
dotenv.config();

describe('Backend API Tests', () => {
  beforeAll(async () => {
    // Connect to the test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
  }, 30000);

  afterAll(async () => {
    // Close the database connection to allow Jest to exit
    await mongoose.connection.close();
  });

  describe('Test 1 — Authentication', () => {
    it('should return a successful response (200) for a valid login', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'kasun@example.com',
          password: 'smartcart'
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.email).toBe('kasun@example.com');
      expect(response.body.role).toBe('customer');
      expect(response.body.firstName).toBe('Kasun');
    });

    it('should return an unauthorized response (401) for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'kasun@example.com',
          password: 'wrong_password'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('credentials do not match');
    });
  });

  describe('Test 2 — Product API', () => {
    it('should retrieve list of products successfully', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Verify the structure of the first product
      const product = response.body[0];
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('brand');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('sku');
    });
  });

  describe('Test 3 — Product validation', () => {
    it('should reject product creation when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Invalid Product'
          // Missing brand, category, price, sku, description
        });

      // Mongoose validation or slugify crashes should return an error response
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('validation failed');
    });

    it('should reject product creation if name is completely missing (type error during slugify)', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          brand: 'Mock Brand',
          category: 'Mock Category'
        });

      // The slugify helper throws because `text` (name) is undefined, caught and returned as 500
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});

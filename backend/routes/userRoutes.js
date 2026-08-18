import express from 'express';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';

const router = express.Router();

// Login
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Those credentials do not match our records.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Those credentials do not match our records.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register
router.post('/users/register', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const joinedMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    const joinedStr = `${now.getDate()} ${joinedMonths[now.getMonth()]} ${now.getFullYear()}`;

    const user = await User.create({
      _id: `u-${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      password: 'smartcart', // Set default password for registrations
      role: 'customer',
      location: 'Colombo, Sri Lanka',
      avatarInitials: `${firstName[0] || 'S'}${lastName[0] || 'C'}`.toUpperCase(),
      joined: joinedStr,
      addresses: []
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Customers List
router.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    const customerRecords = [];

    for (const customer of customers) {
      const orders = await Order.find({ customerId: customer._id });
      const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

      // Customer Status: Active if has orders, or joined recently
      const status = orders.length > 0 ? 'Active' : 'Inactive';

      customerRecords.push({
        id: customer._id,
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        orders: orders.length,
        totalSpent,
        joined: customer.joined,
        status,
        location: customer.location.split(',')[0] || 'Colombo'
      });
    }

    // Sort to match seed orders or count
    res.json(customerRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

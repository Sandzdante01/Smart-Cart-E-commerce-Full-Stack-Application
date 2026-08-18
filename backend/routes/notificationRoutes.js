import express from 'express';
import { Notification } from '../models/Notification.js';

const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark all notifications as read
router.patch('/read', async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all notifications
router.delete('/', async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

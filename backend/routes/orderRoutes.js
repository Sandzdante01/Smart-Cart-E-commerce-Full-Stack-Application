import express from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { Notification } from '../models/Notification.js';

const router = express.Router();

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer orders
router.get('/customer/:customerId', async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place a new order
router.post('/', async (req, res) => {
  const { customerId, customerName, items, subtotal, discount, shipping, total, payment, address } = req.body;
  const io = req.app.get('io');

  try {
    // 1. Verify stock for each item
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found.` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}. Only ${product.stock} items remaining.` });
      }
    }

    // 2. Decrement stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      const newStock = product.stock - item.quantity;
      const newStatus = newStock === 0 ? 'Out of Stock' : product.status;
      
      await Product.findByIdAndUpdate(item.productId, {
        stock: newStock,
        status: newStatus
      });

      // Broadcast stock update
      if (io) {
        io.emit('productStockUpdated', {
          productId: item.productId,
          stock: newStock,
          productName: product.name
        });
      }
    }

    // 3. Create unique order ID
    const count = await Order.countDocuments({});
    const orderId = `SC-2026-${1025 + count}`;

    // Estimated delivery (3 days from now)
    const delDate = new Date();
    delDate.setDate(delDate.getDate() + 3);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const deliveryStr = `${delDate.getDate()}–${delDate.getDate() + 3} ${months[delDate.getMonth()]} ${delDate.getFullYear()}`;

    const now = new Date();
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const order = await Order.create({
      _id: orderId,
      customerId,
      customerName,
      date: dateStr,
      items,
      subtotal,
      discount,
      shipping,
      total,
      payment,
      status: 'Processing',
      address,
      estimatedDelivery: deliveryStr
    });

    // 4. Create Notification
    const notifId = `n-${Date.now()}`;
    const notifMessage = `New order #${orderId} received.`;
    await Notification.create({
      _id: notifId,
      type: 'order',
      message: notifMessage,
      time: 'Just now',
      read: false
    });

    // 5. Broadcast Socket events
    if (io) {
      io.emit('newOrder', {
        orderId,
        customerName,
        total
      });
      io.emit('newNotification', {
        id: notifId,
        type: 'order',
        message: notifMessage
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin)
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const io = req.app.get('io');

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    // Create a notification for order status change
    const notifId = `n-${Date.now()}`;
    const notifMessage = `Order #${order._id} is now ${status}.`;
    await Notification.create({
      _id: notifId,
      type: status === 'Delivered' ? 'delivery' : 'order',
      message: notifMessage,
      time: 'Just now',
      read: false
    });

    // Broadcast status change and notification
    if (io) {
      io.emit('orderStatusUpdated', {
        orderId: order._id,
        status
      });
      io.emit('newNotification', {
        id: notifId,
        type: status === 'Delivered' ? 'delivery' : 'order',
        message: notifMessage
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

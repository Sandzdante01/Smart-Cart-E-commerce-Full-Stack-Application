import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { connectDB } from './config/db.js';
import { Product } from './models/Product.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import utilityRoutes from './routes/utilityRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
  }
});

// Share socket instance across routers
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Bind API Routes
app.use('/api', userRoutes); // Login, Register, Customers
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', utilityRoutes); // Newsletter, Contact

// Fallback Route
app.use('/', (req, res) => {
  res.json({ message: 'SmartCart E-commerce API is running.' });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`Socket client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket client disconnected: ${socket.id}`);
  });
});

// Connect to DB and start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Check if database needs seeding
    const productCount = await Product.countDocuments({});
    if (productCount === 0) {
      console.log('Database appears empty. Launching automatic seeding script...');
      exec('node scripts/seed.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Automatic seeding error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Seeding script output (stderr): ${stderr}`);
        }
        console.log(`Seeding script output (stdout):\n${stdout}`);
      });
    }

    server.listen(PORT, () => {
      console.log(`Server running in development mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup failure: ${error.message}`);
  }
};

startServer();

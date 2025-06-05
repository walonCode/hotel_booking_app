import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/database';
import authRoutes from './routes/authRoutes';
import hotelRoutes from './routes/hotelRoutes';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import adminRoutes from './routes/adminRoutes';
import chatRoutes from './routes/chatRoutes';
// import paymentRoutes from './routes/paymentRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/payments', paymentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
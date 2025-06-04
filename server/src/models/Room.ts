import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [String],
  images: [String],
  availability: [{
    date: Date,
    isAvailable: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Room = mongoose.model('Room', roomSchema);
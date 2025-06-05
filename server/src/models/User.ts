import mongoose from 'mongoose';

export enum UserRole {
  USER = 'user',
  OWNER = 'owner',
  ADMIN = 'admin'
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  },
}, { timestamps:true });


export const User = mongoose.model('User', userSchema);
import mongoose, { Document, Schema } from 'mongoose';

interface IMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface IChatHistory extends Document {
  user: mongoose.Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatHistorySchema = new Schema<IChatHistory>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

export const ChatHistory = mongoose.model<IChatHistory>('ChatHistory', chatHistorySchema);
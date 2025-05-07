import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: 'blog', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
export const Comment = model('Comment', commentSchema);

// import { Schema, model } from 'mongoose';

// const commentSchema = new Schema({
//     blogId: { type: Schema.Types.ObjectId, ref: 'blog', required: true },
//     userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
//     comment: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   });
  
// export const Comment = model('Comment', commentSchema);

import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'blog', required: true },
  userId: {
    type: Schema.Types.Mixed,  // Allow both ObjectId and string (for guest users)
    required: true,
    validate: {
      validator: function(value) {
        // If userId is an ObjectId, it must be a valid ObjectId
        if (typeof value === 'string') {
          // If it's a string, allow it (for guest users)
          return true;
        }
        return Schema.Types.ObjectId.isValid(value);  // Validate ObjectId if not a string
      },
      message: 'Invalid userId'
    }
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = model('Comment', commentSchema);

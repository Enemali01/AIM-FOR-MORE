import {model,Schema} from "mongoose"

export const blogSchema = new Schema (
  {
    title:{type: String},
    description: {type: String},
    file:{type: String},
    category:{type: String},
    createdAt:{type: Date, default: new Date()},
  },
)
export const Blog = model('post', blogSchema);
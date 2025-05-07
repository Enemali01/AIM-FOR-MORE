import {model, Schema} from 'mongoose'

const categorySchema = new Schema (
  {
    category:{type:String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
  }
)
export const Category = model('categories', categorySchema);
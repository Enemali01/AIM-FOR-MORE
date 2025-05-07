import {model,Schema} from "mongoose"

export const productSchema = new Schema (
  {
    category:{type: Schema.Types.ObjectId, ref:'categories', required: true}, 
    id: {type: String, required: true},
    name:{type: String },
    price:{type:Number},
    quantity:{type: Number, default: 1},
    description:{type: String},
    file:{type: String},
    createdAt:{type: Date, default: new Date()},

  }
)
export const Product = model('product', productSchema);


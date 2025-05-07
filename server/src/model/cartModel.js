import {model, Schema} from 'mongoose'


export const cartSchema = new Schema(
  {

    userId: {type:  Schema.Types.ObjectId, ref: 'user', required: true},
    items:[{ ItemId: {type:  Schema.Types.ObjectId, ref: 'product', required: true},
    id:{type: String},
    name: {type:String},
    price:{type:Number},
    quantity:{type:Number, min: 1, default: 1},
    file:{type: String},
    }],	
    bill: {type: Number},
  },{timestamps:true}
)

export const Cart = model('cart', cartSchema);



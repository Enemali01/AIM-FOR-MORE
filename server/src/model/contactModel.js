import {model, Schema} from 'mongoose'

export const contactSchema = new Schema(
  {
    userId: {type:  Schema.Types.ObjectId, ref: 'user', required: true},
    lastname:{type:String},
    message: {type: String},
    createAt:{type: Date, default: Date.now}
  }
)

export const Contact = model('contact', contactSchema)

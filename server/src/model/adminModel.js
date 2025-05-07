import {model, Schema} from 'mongoose'

export const adminSchema = new Schema (
  {
    userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    lastname:{type: String, required: true},
    firstname:{type: String, required: true},
    gender:{type: String},
    password:{type: String, required: true},
    phone:{type: Number, required: true},
    createdAt:{type:Date, Default: Date.now},
    updatedAt:{type:Date, Default: Date.now},
  }
)
export const AdminModel = model('admin', adminSchema);


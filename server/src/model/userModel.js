import {model, Schema} from "mongoose";


const userSchema = new Schema(
  {
    lastname:{type: String, required: true},
    firstname: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, default: 'user', enum:['user', 'admin'] },
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// userSchema.pre('save', async function (next) {
//   if(!this.isModified('password')){
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.getJwtToken = function () {
//   return jwt.sign({ _id: user.id, user: user.role }, process.env.SECRET_KEY, { expiresIn: "2d" });
// };

// userSchema.methods.verifyPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, user.password);
// };

export const UserModel = model('user', userSchema);

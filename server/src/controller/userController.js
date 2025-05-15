import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
import { UserModel } from '../model/userModel.js'
const PASSWORD_HASH_SALT_ROUNDS = 10;


 
 export const register = async (req,res) => {
       const {lastname, firstname, email,confirmPassword, password, phone, role, token} = req.body;
     if(!email || !password || !confirmPassword || !lastname || !firstname || !phone ){
       return res.status(400).json({message: 'Please enter all the fields', success:false});
     }
     if(password.length < 6){
       return res.status(400).json({message: 'Password should be atleast 8 characters', success:false});
       }
       if(confirmPassword !== password){
         return res.status(400).json({message: 'Password do not match', success:false});
      }
         const user = await UserModel.findOne({email});
         if(user){
           res.status(404).json({message:'User already exist, please Login', success:false});
           return;
           }
         const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS
         );
         const newUser ={
           lastname,
           firstname,
           email: email.toLowerCase(),
           password: hashedPassword,
           phone,
           token,
           role,
         };
         await UserModel.create(newUser);
         res.status(200).json({message: 'Registration completed!', success: true, generateTokenResponse});
    } 
 

export const login = async (req,res) =>{
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: 'Please Enter fields'});
    }
    const user = await UserModel.findOne({email});
    if(!user){
      return res.status(400).json({message: 'User with this Email does not exist'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Incorrect Password'});
    }
    const token = jwt.sign({_id: user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: '5d'}
    );
      res
      .status(200)
      .json({
        token, 
        user: {_id: user._id, firstname: user.firstname, role: user.role },message:'Login Successful'
      });

  } catch (error) {
    // console.log(error)
    res.status(500).json({error: error.message});
  }
}

export const verify = async (req,res) => {
  return res.status(200).json({success: true, user: req.user})
}

 const generateTokenResponse = user => {
   const token = jwt.sign(
     {
       _id: user._id,
       role: user.role,
   }, 
   process.env.SECRET_KEY,
   {
     expiresIn: '30d',
   }
   );
 
   return{
     id: user.id,
     lastname:user.lastname,
     firstname: user.firstname,
     email: user.email,
     phone: user.phone,
     token,
     role:user.role,
   }
 };

export const logout = async (req,res) => {
  try {
    res.cookies('token', '', {httpOnly: true, expires: new Date(0)});
    res.status(200).json({success: true, message:'Logout Successfully'})
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async(req,res) =>{
  const {id} = req.params;
  try {
    const user = await UserModel.findById({_id:id})
    return res.status(201).json({message:true,  user})
  } catch (error) {
    res.status(500).send({success:false, message:'Server Error/Error Process your request'})
  }
}

export const editUser = async(req,res) => {
  try {
    const id = req.params.id
    const {firstname, phone, lastname} = req.body;
       const updateUser = await UserModel.findByIdAndUpdate(id, req.body, 
      {
        new: true
      });
    res.status(200).json({message: 'Record Updated', updateUser});
  } catch (error) {
    res.status(500).json({ message:"Error updating records" });
  }
}

export default {login,verify, register, logout, getUserById, editUser};

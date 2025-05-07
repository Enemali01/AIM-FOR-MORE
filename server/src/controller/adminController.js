import { AdminModel } from "../model/adminModel.js"
import { UserModel } from "../model/userModel.js"
import bcrypt from 'bcrypt'
const PASSWORD_HASH_SALT_ROUNDS = 8;

export const addAdmin = async(req,res) => {
  try {
    const {firstname,lastname,email,password,confirmPassword,phone, gender, role} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      return res.status(400).json({success:false, message: 'User with email Address already exist'});
    }
     const hashedPassword = await bcrypt.hash(password,PASSWORD_HASH_SALT_ROUNDS);
  
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      phone,
      password:hashedPassword,
      role
    })
   const savedUser = await newUser.save()
  
    const newAdmin = new AdminModel({
      userId: savedUser._id,
      firstname,
      lastname,
      email,
      password,
      gender,
      phone,
    })
    await newAdmin.save()
    return res.status(200).json({success: true, message:'Admin created'})
  } catch (error) {
    console.log(error)
    res.status(500).send({sucess:false, message:'Server Error/Error Process your request'})
  }
 
}

export const getAdmin = async (req,res) =>{
  try {
    const adminUsers = await AdminModel.find().populate('userId', {password:0}).populate('gender');
     res.status(200).json({message:true, adminUsers});
  } catch (error) {
    res.status(500).send({sucess:false, message:'Server Error/Error Process your request'})
  }
}

export const getAdminById = async(req,res) =>{
  const {id} = req.params;
  try {
    const user = await AdminModel.findById({_id:id}).populate('userId');
    return res.status(201).json({message:true,  user})
  } catch (error) {
    res.status(500).send({success:false, message:'Server Error/Error Process your request'})
  }
}

export default {addAdmin, getAdmin, getAdminById};
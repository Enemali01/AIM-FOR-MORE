import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";


 const verifyUser = async (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      return res.status(404).json({success:false, error: 'Token not Provided'})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;
    if(!decoded){
      return res.status(404).json({success:false, error: 'Token not Valid'})
    }
  const user = await UserModel.findById({_id: decoded._id}).select('-password')
    if(!user){
      return res.status(404).json({success:false, error: 'User not Found'})
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
  }
}
//   const token = req.headers.access_token;
//   if(!token) return res.status(401).send();

//   //The below verifies if the token is valid from the user
//   try{
//     const decoded = verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//   }catch(error){ 
//     res.status(401).send();
//   }
//   return next();
// };

// const auth = async(req,res) =>{
//   try {
//     const token = req.header('x-auth-token');
//     if(!token){
//       res.status(401).json({message: 'No auth token , access denied'});
//     }
//     const verified = jwt.verify(token, 'passwordKey');
//     if(!verified) return res.status(401).json({message: 'Token Verification Failed, authorization denied'});
//     req.user = verified.id;
//     next();
//   } catch (error) {
//     console.log(error.message)
//   }
// }




export default verifyUser




// this middleware checks if the user is valid and the token is valid that is generated from the jwt and further displays the error if the user is not valid(error 401)
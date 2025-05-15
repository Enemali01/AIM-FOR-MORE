import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";


const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token not provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    const user = await UserModel.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};



export default verifyUser




// this middleware checks if the user is valid and the token is valid that is generated from the jwt and further displays the error if the user is not valid(error 401)
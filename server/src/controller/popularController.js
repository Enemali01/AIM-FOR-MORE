import { Popular } from '../model/popularModel.js';
import crypto from 'crypto'
import cloudinary from "../midlleware/cloudinary.js";
import streamifier from 'streamifier';
import mongoose from 'mongoose'


// Create a new popular (trending) product
export const createPopularProduct = async (req, res) => {
    const productIdCounter = crypto.randomUUID();
  const { name, description, amount, categoryId} = req.body;

  try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
      }
  
  // Validate categoryId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }
 
      // Upload image to Cloudinary using memory stream
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'popular' }, 
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
  
      const result = await streamUpload(); 
      const popular = new Popular({
        product:{
              id: productIdCounter,
              name,
              description,
              amount,
        },
        image: result.secure_url,
        category:categoryId,
          });
     await popular.save();
     res.status(200).json({ message: 'Popular saved successfully' });
  } catch (error) {
    console.log('Error creating popular product:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




// Get all popular products
export const getAllPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Popular.find().populate('category');
    return res.status(200).json(popularProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching popular products', error });
  }
};


export const getAllTrendingProducts = async (req, res) => {
  try {
    const trending = await Popular.find().populate('product').populate('category');
    res.status(200).json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrendingProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Popular.findByIdAndDelete(id);
    res.status(200).json({ message: 'Trending product deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


export default {createPopularProduct,getAllTrendingProducts, deleteTrendingProduct};
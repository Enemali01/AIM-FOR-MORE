
import { Category } from "../model/categoryModel.js";
import { Product } from "../model/productModel.js";
import crypto from 'crypto'

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({message:true, products});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const create = async (req, res) => {
  let productIdCounter = crypto.randomUUID() ;
  try {
    const {id, name, price, quantity, description, category } = req.body;
    const file = req.file.filename;
    const product = new Product({
      id: productIdCounter,
      name,
      price,
      quantity,
      category,
      description,
      file,
    })
  await product.save();
  
    res.status(200).json({ message: 'Product save succesfuuly' });
  } catch (error) {
    res.status(500).json(error)
  }
}

export const productById = async (req, res) => {
  try {
    const id = req.params.id;
    const productId = await Product.findById(id)
    if (!productId) {
      return res.status(404).json({ message: 'Product not Found' })
    }
    return res.status(200).json(productId)
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message })
  }
}



export const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, quantity, description, stars, category } = req.body;
    const edit = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json({ message: 'Post has been edited Successfull' }).json(edit)
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const deletProd = await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Product has been deleted Successfully', deletProd, success:true })
  } catch (error) {
    return res.status(500).json(error)
  }
}

// GET products by category ID
export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const products = await Product.find({ category: categoryId })
      .populate('category') // optional, if you want category details
      .exec();

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const searchProduct = async (req,res) => {
  const {query} = req.query;
  if(!query || query.trim() === ''){
    return res.status(404).json({error: 'Empty search query'})
  }
  try {
    const result = await Product.find({
      name: {$exists: true, $ne:null, $regex: query, $options: 'i'}
    })
    // console.log(result)
   
    if(result.length === 0){
      return res.status(404).json({message: 'No product found'})
    } 
    res.json(result)
  } catch (error) {
    res.status(500).json({error:'Search failed'})
  }

}

export default { create, getProduct, productById, editProduct, deleteProduct, getProductsByCategory, searchProduct };
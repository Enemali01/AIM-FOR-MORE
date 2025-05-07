import { Category } from "../model/categoryModel.js";

export const createCategory = async (req,res) =>{
  try {
    const {category, description} = req.body;

     const cate = await Category.findOne({category})
     if(cate){
      return res.status(401).json({success: false, message:'Category already Exist'});
     }
     const newCat = new Category({
      category, 
      description,
     })
     await newCat.save();
     return res.status(200).json({success: true,  message:'Category Saved '});
  } catch (error) {
    res.status(500).json({success: false, message:error.message})
  }
}

export const getAllCategory = async (req,res) =>{
  try {
    const getCategory = await Category.find()
    res.send(getCategory);
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export const getById = async(req,res) =>{
  try {
    const id = req.params.id
    const getCat = await Category.findById(id);
    if(!getCat){
      return res.status(401).json({message: 'Category Doesnt not Exist'})
    }
    return res.status(200).json(getCat)
  } catch (error) {
    res.status(500).json({error:error.message})

  }
}

export const deleteCategory = async (req,res) =>{
  try {
    const id = req.params._id;
    const isExist = await Category.find({_id:id});
    if(!isExist){
      return res.status(401).json({message:'Category does not exist'});
    }
    await Category.findOneAndDelete(id)
     res.status(200).json({message:'Category has been deleted Successfully'})
  } catch (error) {
    res.status(500).send({message:'Error in Deleting Category, Try Again', error:error.message}) 

  }
}

export const editCategory = async(req,res) =>{
  try {
    const id = req.params.id;
    const {category, description} = req.body;
    const edit = await Category.findOneAndUpdate(id,req.body,
      {
        new:true
    }
  )
  res.status(200).json({message:'Category has been updated successfuly'})
  } catch (error) {
    res.status(500).json({message:'Server Error'})
  }
}




export default {createCategory, getAllCategory, deleteCategory, editCategory, getById };
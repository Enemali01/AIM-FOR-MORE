import {Router} from "express";
import { createPost, deletePost, getAllPost, editPost, getPostById, getTotalPosts } from "../controller/blogController.js";
import authMiddleware from '../midlleware/authMiddleware.js'
import upload from "../midlleware/imageMiddleware.js";

const route = Router();

route.post('/post', upload.single('file'), authMiddleware, createPost);
route.get('/allpost', getAllPost);
route.get('/posts/:id', getPostById)
route.put('/update/:id',authMiddleware, editPost)
route.delete('/:id',authMiddleware, deletePost)
route.get('/total/count', getTotalPosts);


export default route

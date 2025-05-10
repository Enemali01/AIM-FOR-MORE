import { Blog } from "../model/blogModel.js";
import streamifier from 'streamifier';



export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
// Upload image to Cloudinary using memory stream
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'blog_images' },
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

    const post = new Blog({
      title: title,
      description: description,
      category: category,
      file: result.secure_url,
    });

    await post.save();
    res.status(200).json({ message: "Blog post saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server Error as a result of a Wrong file selected', error: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleBlog = await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Post has been deleted Successfully', success: true, deleBlog })

  } catch (error) {
    res.status(500).json({ message: 'Error in Deleting Post, Try Again', error })
  }
}


export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const postId = await Blog.findById(id);
    if (!postId) {
      return res.status(404).json({ message: 'Not Found' });
    }
    // const updatePost = await Posts.findOneAndUpdate(id, req.body, req.files, {new: true})
    res.status(200).json(postId)

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, category } = req.body;
    const edit = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json({ message: 'Post has been edited Successfull', edit })
  } catch (error) {
    console.log(error)
  }
}

export const getAllPost = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json({ message: true, posts })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export const getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await Blog.countDocuments();
    res.status(200).json({ total: totalPosts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total post count', error: error.message });
  }
};


export default { createPost, deletePost, getAllPost, editPost, getPostById, getTotalPosts };

import { Comment } from '../model/commentModel.js';

export const getBlogComment = async (req,res) =>{
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .sort({ createdAt: -1 })
      .populate('userId', 'firstname lastname');
      // console.log('Comments:', comments);

    res.json(comments);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
}

export const postBlogComment = async(req,res) =>{
  try {
    const newComment = new Comment({
      blogId: req.params.blogId,
      userId: req.body.userId, // Make sure frontend passes this
      comment: req.body.comment
    });
    await newComment.save();
    const saved = await newComment.populate('userId', 'firstName lastName'); // populate user details
    res.json(saved);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to post comment' });
  }
}

export const deleteBlogComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};


export default {getBlogComment, postBlogComment, deleteBlogComment}
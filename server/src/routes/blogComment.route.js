import {Router} from 'express';
import { getBlogComment, postBlogComment, deleteBlogComment } from '../controller/commentController.js';

const router = Router();

router.get('/:blogId', getBlogComment);
router.post('/:blogId', postBlogComment);
router.delete('/:commentId', deleteBlogComment);


export default router;

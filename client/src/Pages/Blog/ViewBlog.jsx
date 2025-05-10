
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hook/authContext';
import Footer from '../../Components/Footer/Footer';


const apiUrl = 'https://aim-for-more-server.onrender.com ';

function ViewBlog() {
  const { id } = useParams();
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`${apiUrl}/api/blog/posts/${id}`);
        setPosts(postResponse.data);
        const commentResponse = await axios.get(`${apiUrl}/api/blog-comment/${id}`);
        setComments(commentResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post and comments:', err);
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(`${apiUrl}/api/blog-comment/${id}`, {
          comment: newComment,
          userId: user._id, // pass userId from auth context
        });
        setComments((prev) => [...prev, response.data]);
        setNewComment('');
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {posts ? (
        <section>
          <div className='flex shadow-lg max-w-3xl mx-auto mt-10 bg-white rounded-md shadow-lg'>
            <div className=''>
              <div className='rounded-xl overflow-hidden'>
                <img className='w-full' src={`${apiUrl}/images/${posts.file}`} alt='Blog Post' />
              </div>
              <h2 className='text-success py-1 px-2'>{posts.title}</h2>
              <p className='text-1xl md:text-1xl mt-1'>{posts.description}</p>
            </div>
          </div>

          {/* Comments Section */}

          <div className='mt-8 max-w-2xl mx-auto px-4 py-6'>
            <h3 className='text-lg font-semibold mb-3 text-emerald-800'>Comments</h3>

            <form onSubmit={handleCommentSubmit} className='mb-6'>
              <textarea
                className='w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600'
                placeholder='Write a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows='3'
              />
              <button
                type='submit'
                className='mt-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition'
              >
                Submit Comment
              </button>
            </form>
            <p>N.B: Only logged in User to Comment</p>

            <div className='space-y-3'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="p-3 border border-gray-100 rounded shadow-sm bg-white">
                    <p className="text-sm font-medium text-emerald-700">
                      {comment.userId?.firstname || 'Anonymous'} {comment.userId?.lastname || ''}
                    </p>
                    <p className="text-sm text-gray-800 mt-1">{comment.comment}</p>
                    <p className="text-xs text-gray-500 mt-1 italic">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>

        </section>
      ) : (
        <div>Loading...</div>
      )}
      <Footer />
    </>
  );
}

export default ViewBlog;

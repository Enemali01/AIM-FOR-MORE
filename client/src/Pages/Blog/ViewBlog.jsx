
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hook/authContext';
import Footer from '../../Components/Footer/Footer';


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';

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

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   if (newComment.trim()) {
  //     try {
  //       const response = await axios.post(`${apiUrl}/api/blog-comment/${id}`, {
  //         comment: newComment,
  //         userId: user._id, // pass userId from auth context
  //       });
  //       setComments((prev) => [...prev, response.data]);
  //       setNewComment('');
  //     } catch (err) {
  //       console.error('Error posting comment:', err);
  //     }
  //   }
  // };

<<<<<<< HEAD
  if (loading) return <div className='flex items-center justify-center space-x-2 mt-70'>
  <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
  <div className='text-emerald-700 font-medium'>
    Loading Blog Post...
=======
  if (loading) return <div className='flex items-center justify-center space-x-2'>
  <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
  <div className='text-emerald-700 font-medium mx-auto'>
    Loading...
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
  </div>
</div>;

  return (
    <>
      <Navbar />
      {posts ? (
        <section>
<<<<<<< HEAD
          <div className='flex shadow-lg max-w-3xl mx-auto mt-30 bg-white rounded-md shadow-lg py-4 px-3'>
=======
          <div className='flex shadow-lg max-w-3xl mx-auto mt-15 bg-white rounded-md shadow-lg'>
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
            <div className=''>
              <div className='rounded-xl overflow-hidden'>
                <img className='w-full' src={posts.file} alt='Blog Post' />
              </div>
              <h2 className='text-success py-1 px-2'>{posts.title}</h2>
              <p className='text-1xl md:text-1xl mt-1'>{posts.description}</p>
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


import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Heroblogimg from '../../assets/image/london2.jpeg'
import Footer from '../../Components/Footer/Footer'

const apiUrl = 'https://aim-for-more-server.onrender.com '

function Post() {
 
  
  const  [posts, setPosts] = useState([])

  useEffect(()=>{
      const getPost = async () =>{
      
        try {
          const response = await axios.get(`${apiUrl}/api/blog/allpost`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.message){
            let sno = 1 ;
            const data = await response.data.posts.map((post) => ({
              _id:post._id,
              sno: sno++,
              title: post.title,
              description: post.description,
              category:post.category,
              file:post.file,
            }))
            setPosts(data)
          }
        } catch (error) {
          console.log(error)
        }
      }
      getPost()
  },[])

  return (
    <>
       <Navbar />

  <section>
    <div className='mt-15'>
      <img src={Heroblogimg} alt='blog-hero'  className='h-10 w-full' style={{height:'500px'}}/>
      <h1 className=' text-5xl absolute right-1/2 top-1/3 bottom text-success translate-y-1/2 translate-x-1/2'>Blog post</h1>
    </div>
  </section>
    
  <section>
  <h4 className='text-center  mt-5 text-success '>Blog Post</h4>
    <div className='flex items-center justify-center  container mx-auto pb-5'>
      <div className=' grid grid-cols-1 md:grid-cols-3 lg-grid-cols-3 gap-5 '>
      {Array.isArray(posts) && posts.map((post) => {
        return   <div className='card rounded-md shadow-xl'>
        <div className='py-1 px-1 flex flex-col'>
          <div className='rounded-xl overflow-hidden'>
          <Link to={`/blog/${post._id}`}><img  className='w-full h-55' src={`${apiUrl}/images/${post.file}`} alt='blopost'/></Link>
          </div>
          <h6 className='text-2xl md:text-3xl font-medium mt-2'>{post.title}</h6>
          <p className='text-1xl md:text-1xl mt-1'>{post.description.length > 100 ? `${post.description.substring(0, 80)}....` : post.description}</p>
          <Link to={`/blog/${post._id}`} className='text-center bg-emerald-700 text-white text-decoration-none py-2 px-2 rounded'>Read more</Link>
        </div>
      </div>
      })}
      </div>
        </div>
    </section>
    <section>
  <Footer/>
    </section>
 
    </>
  )
}

export default Post
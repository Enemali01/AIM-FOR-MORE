import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { colums , BlogButton } from '../../utils/BlogHelper'


const apiUrl = 'https://aim-for-more-server.onrender.com '
function BlogDashboard() {

  const [filterPosts, setFilterPosts] = useState([])
  const [loadingPost, setLoadingPost] = useState(false)
  const  [posts, setPosts] = useState([])

  const postDelete = async() => {
    const data = await posts.filter(post => post._id !== id)
    setPosts(data);
  }

  useEffect(()=>{
      const getPost = async () =>{
        setLoadingPost(true)
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
              action: <BlogButton id={post._id} postDelete={postDelete}/>,
            }))
            setPosts(data)
            setFilterPosts(data)
          }
        } catch (error) {
          console.log(error)
        }finally{
          setLoadingPost(false)
        }
      }
      getPost()
  },[])

  const filteredPost = (e) => {
    const records = posts.filter((post) => 
      post.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterPosts(records);
  }

  return (
    <>
    {loadingPost ? <div>Loading</div> : 
      <section>
       <div className='p-6 '>
                  <h3 className='text-2xl text-center'>Manage Products</h3>
                  <div className='flex justify-between items-center'>
                    <input
                      type='text'
                      placeholder='Search by Product Name' className='px-3 py-2.5'
                      onChange={filteredPost}
                    />
                    <Link to='/dashboard/create/post' className='px-4 py-2 bg-teal-500 text-white rounded text-decoration-none'>Create  new Blog Post</Link>
                  </div>
                <div>
                  <DataTable 
                  columns={colums} 
                  data={filterPosts}
                  pagination
                  />
                </div>
          </div>
        </section>
        }
    </>
  )
}

export default BlogDashboard
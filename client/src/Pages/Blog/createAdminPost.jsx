import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {Alert} from 'react-bootstrap'
import * as FaIcon from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom';


const apiUrl = 'https://aim-for-more-server.onrender.com ';

export default function createAdminPost() {

// const [formData, setFormData] = useState({})
// const handleChange = (e) => {
//   const {name, value, files} = e.target;
//   if(name === 'file'){
//     setFormData((prevData) =>({...prevData, [name] : files[0]}))
//   }else{
//     setFormData((prevData) =>({...prevData, [name] : value}))
//   }
// }

  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(false)
  const  [posts, setPosts] = useState([])
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('category', category);

    const response = await axios.post(`${apiUrl}/api/blog/post`, formData, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`   
      }
    })
    if(response.data.message){
      toast.success(response.data.message)
      navigate('/dashboard')
    }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const getPost = async () =>{
    try {
      const post = await axios.get(`${apiUrl}/api/blog/allpost`)
       setPosts(post.data)
    } catch (error) {
      console.log(error)
    }
  }

   const handleTrash = (id) =>{
    try {
      const res = axios.delete(`${apiUrl}/api/blog/trash/:id`,+id)
       if(res.data.message){
        toast.success(res.data.message)
       }
    } catch (error) {
      toast.error(error.res.data.message)
    }
  }


  useEffect(()=>{
    getPost();
  },[])
  return (
    <>
      {/* <section>
        <div  className='grid grid-cols-3 gap-4 py-4 px-4'>
          <div>
                	<h6>Create a Blog Post</h6>
                  <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group className="mb-3 pt-3">
                  <Form.Control
                    type='title'
                    placeholder='Enter Title'
                    name='title'
                    onChange={handleChange}
                    autoComplete='off'
                  />
                </Form.Group>
                <Form.Group className="mb-3 pt-3">
                <Form.Control as="textarea"
                    name='description'
                    required rows={8}
                    placeholder='Enter message'
                    onChange={handleChange}
                    autoComplete='off'
                  />
                </Form.Group>
                <Form.Group className="mb-3 pt-3">
                  <Form.Control
                    type='file'
                    placeholder='Enter Image'
                    name='fileUpload'
                    accept='jpeg,jpg,png'
                    onChange={handleChange}
                    autoComplete='off'
                  />
                   <Form.Control
                    type='category'
                    name='category'
                    placeholder='Enter category'
                    onChange={handleChange}
                    autoComplete='off'
                  />
                </Form.Group>
                <div className='d-grid gap-2'>
                <Button className='btn btn-success' type='submit'> Post</Button>
              </div>
                </Form>
                </div>
                <div>
                  o0
              </div>
                </div>
      
      </section> */}

      <section>
        <div className='flex px-4'>
          <div className='max-w-3xl mx-auto mt-10 bg-white rounded-md shadow-lg w-98 p-6 px-4 py-'>
            <h4 className='text-4xl font-bold'>Create a blog Post</h4>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='mt-3'>
                <label
                  htmlFor='title'
                  className='text-sm font-medium text-gray-700'
                >Title
                </label>
                <input
                  type='text'
                  name='title'
                  placeholder='Enter Title'
                  className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                  onChange={(e)=> setTitle(e.target.value)}
                />
                <label
                  htmlFor='category'
                  className='text-sm font-medium text-gray-700'
                >Category
                </label>
                <input
                  type='text'
                  name='category'
                  placeholder='Enter Category. e.g.Broilers'
                  className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                  onChange={(e)=> setCategory(e.target.value)}
                />
                <label
                  htmlFor='descriprion'
                  className='text-sm font-medium text-gray-700'
                >Descriprion
                </label>
                <textarea
                  type='text'
                  name='description'
                  placeholder='Enter description of the post'
                  className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
                  rows='6'
                  onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
                <label htmlFor='fileUpload'>Select Image</label>
                <input
                  type='file'
                  accept='png,jpeg,jpg'
                  name='file'
                  className='block w-full border border-gray-400 rounded-md p-2 mt-1 py-2 px-3 mb-4'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Add Blog Post</button>
            </form>
          </div>
          {/* <div className='w-64 flex-auto'>
            <div className='p-2'>
            <h4 className='text-4xl font-bold text-center'>Blog Post</h4>
            {error && <Alert  variant='danger'>{error}</Alert>}
            <div className='relative flex flex-col w-full h-full overflow-scroll text-teal-700 bg-white shadow-md rounded-xl bg-clip-border'>
              <table className='w-full text-left table-auto min-w-max py-2 px-2'>
                <thead>
                  <tr>
                  <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      SN
                    </th>
                    <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      Title
                    </th>
                    <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      Category
                    </th>
                    <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      Description
                    </th>
                    <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      Image
                    </th>
                    <th className='p-2 border-b border-blue-gray-100 bg-blue-gray-50'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(posts) && posts.length > 0 ? (
                     posts.map((post,index) => (
                 <tr key={post.id}>
                  <td className='p-1 border-b border-emerald-50'>{index + 1}</td>
                    <td className='p-4'>{post.title}</td>
                    <td className='p-1'>
                      {post.category}
                    </td> 
                    <td className='p-1'> {
                          post.description.length > 50 ? `${post.description.substring(0, 50)}.......` : post.description
                        }</td>
                    <td className='p-1'>
                      <img src={`https://aim-for-more-server.onrender.com /images/${post.file}`+file}  alt='blog imag' className='w-15 h-10 rounded-xl' />
                    </td>
                    <td className='p-1'>
                    <Link to={'/dashboard/create/post/post/' + post._id} className='text-decoration-none'>
                      <button type='submit' className='w-full flex items-center block bg-yellow-500 py-2 px-2 text-white rounded' ><FaIcon.FaPencilAlt/><span>Edit</span>
                      </button>
                      </Link>
                    </td>

                    <td className='p-1'>
                      <button type='submit' className='w-full flex items-center  block bg-red-700 py-2 px-2 text-white  rounded' onClick={(e) =>handleTrash()}><FaIcon.FaTrash/><span>Delete</span></button>
                      </td>
                  </tr>
                     ))
                  ):(
                    <p className='block font sans text-sm antialised font-normal leading none text-blue-gray-900 opacity-70'>No Blog Post</p>  
                  )}
                  
                </tbody>
              </table>
            </div>
            </div>
          </div> */}
        </div>
      </section>

    </>
  )
}

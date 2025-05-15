import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPenAlt, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const apiUrl = 'https://aim-for-more-server.onrender.com';

// Modal for adding a popular product
const AddPopularProductModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch categories for the dropdown
    axios.get(`${apiUrl}/api/category/all`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories', error));
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!categoryId || !image) {
      alert("Please select a category and an image");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('categoryId', categoryId);
    formData.append('image', image); 

    try {
      const response = await axios.post(`${apiUrl}/api/popular/`, formData);
      console.log('Popular product created:', response.data);
      onClose();
    } catch (error) {
      console.log('Error creating popular product:', error);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-xl  w-full  md:mx-0 justify-between">
        <div className='flex justify-between'>
          <h6 className="text-2xl font-bold">Add Trending Product</h6>
          <button onClick={onClose} className="bg-red-700 text-white rounded text-5xl h-6 w-6">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              name='name'
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name='description'
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              name='amount'
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) && categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Image URL</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button type="submit" className="w-full mt-4 py-2 bg-emerald-700 text-white rounded-md">
            Add Product
          </button>
        </form>

      </div>
    </div>
  );
};

// Main Page to display products and handle modal visibility
const Popular = () => {
  const {id} = useParams()
  const [popularProducts, setPopularProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all popular products
    axios.get(`${apiUrl}/api/popular/`)
      .then(response => {
        setPopularProducts(response.data);
      })
      .catch(error => console.error('Error fetching popular products', error));
  }, []);

  const handleAddProductClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  
  const handleTrash = async() =>{
    const confirm = window.confirm('Are you sure you want to delete')
    if(confirm){
      try {
        const response =  await axios.delete(`${apiUrl}/api/popular/${id}`,id);
        if(response.data.message){
          toast.success(response.data.message)
          window.location.reload()
         }
          
      } catch (error) {
        alert(error)
      }
    }
  }
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Products</h2>

      {/* Button to open the modal */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAddProductClick}
          className="px-6 py-2 bg-emerald-700 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Table to display products */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Image</th>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Product Name</th>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Description</th>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Amount</th>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Category</th>
              <th className="px-1 py-2 text-left text-sm font-semibold text-gray-600 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(popularProducts) && popularProducts.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="px-1 py-2">
                  <img src={product.image} alt={product.product.name} className="w-10 h-10 object-cover rounded-md" />
                </td>
                <td className="px-1 py-2">{product.product.name}</td>
                <td className="px-1 py-2">{product.product.description}</td>
                <td className="px-1 py-2">${product.product.amount}</td>
                <td className="px-1 py-2">{product.category?.category}</td>
                <td className="px-1 py-2">
                  <div className='flex justitfy-between px-1'>
                    <Link to=''><button ><FaPencilAlt className='text-gray-500'/> </button></Link>
                    <button onClick={() =>handleTrash(id)} className='p-2'><FaTrashAlt className='text-red-600'/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new product */}
      <AddPopularProductModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Popular;

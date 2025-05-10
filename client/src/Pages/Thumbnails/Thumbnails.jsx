
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from 'react-use-cart';
import { useAuth } from '../../Components/Hook/authContext';
import { Link } from 'react-router-dom';
import FavouriteIcon from '../../Components/FavouriteIcon/FavouriteIcon';

const apiUrl = 'https://aim-for-more-server.onrender.com';

function Thumbnails() {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${apiUrl}/api/product/all`),
          axios.get(`${apiUrl}/api/category/all`)
        ]);
        setProducts(productsRes.data.products);
        setFilteredProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (categoryId) => {
    if (categoryId === 'all') {
      setFilteredProducts(products);
      setActiveCategory('all');
    
    } else {
      const filtered = products.filter(p => p.category._id === categoryId);
      setFilteredProducts(filtered);
      setActiveCategory(categoryId);
    }
  };

  const handleAddToCart = async (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart ✅`);

    if (!user?._id) return;
    if(!user?.role !== 'user') return;

    try {
      await axios.post(`${apiUrl}/api/cart/add-to-cart`, {
        userId: user._id,
        cartItems: [
          {
            ItemId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            file: product.file,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Browse Products</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeCategory === 'all' ? 'bg-emerald-700 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`px-4 py-2 rounded ${activeCategory === cat._id ? 'bg-emerald-700 text-white' : 'bg-gray-300'}`}
            onClick={() => handleFilter(cat._id)}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="card shadow p-4 rounded relative">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`${apiUrl}/images/${product.file}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                  />
                </Link>
                <h5 className="font-semibold">{product.name}</h5>
                <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                  {product.description}
                </p>
                <p className="text-md font-bold text-emerald-700">₦{product.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="bg-emerald-700 text-white px-4 py-2 rounded"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <FavouriteIcon product={product} />
                </div>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Thumbnails;

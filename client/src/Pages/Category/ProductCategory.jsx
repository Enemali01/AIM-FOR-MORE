import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from 'react-use-cart';

const apiUrl = 'https://aim-for-more.vercel.app/';

const ProductCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product/category/${id}`);
        setProducts(res.data.products);
      } catch (error) {
        console.error('Failed to fetch products by category', error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="card p-4 shadow">
          <img
            src={`${apiUrl}/images/${product.file}`}
            alt={product.name}
            className="w-full h-40 object-cover mb-3"
          />
          <h5>{product.name}</h5>
          <p>N {product.price}.00</p>
          <button
            className="bg-emerald-700 text-white px-4 py-2 rounded mt-2"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;

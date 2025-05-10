
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar'

const apiUrl = 'http://localhost:5000';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${apiUrl}/api/product/search?query=${query}`);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        setResults(data);
      } catch (err) {
        setError(err.res.data.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-4 container">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>

        {results.length > 0 ? (
          <>
            <p className="mb-4">Showing results for: <strong>{query}</strong></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map(product => (
                <div key={product._id} className="border p-4 rounded">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={`${apiUrl}/images/${product.file}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  </Link>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No products found for: <strong>{query}</strong></p>
        )}
      </div>
    </>
  );
}

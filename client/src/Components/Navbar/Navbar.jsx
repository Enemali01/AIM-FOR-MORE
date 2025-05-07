
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as FaIcon from 'react-icons/fa';
import {IoIosCloseCircle, IoMdArrowDropdown, IoMdClose} from 'react-icons/io';
import logo from '../../image/Aim-logo.jpg';

// import logo from '../../image/aim logo.jpg';
import { useAuth } from '../Hook/authContext';
import { useCart } from 'react-use-cart';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { items, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    updateItemQuantity(null, 0);
    logout();
    setShowDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setShowSearch(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setIsMenuOpen(false);
  };

  return (
    <>
      <section>
        <nav className="flex sticky top-0 w-full left-0 z-20 justify-between items-center px-6 pt-1 pb-1 md:px-30 bg-emerald-700 drop-shadow-4xl">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 object-contain rounded-3xl hover:scale-110 transition-all" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden xl:flex items-center gap-4 font-semibold text-base text-white">
            <NavLink to="/about" className={({ isActive }) => `${isActive ? 'bg-emerald-800' : ""} py-2 px-3 text-white rounded-md transition-all cursor-pointer text-decoration-none`}>About</NavLink>
            <NavLink to="/product" className={({ isActive }) => `${isActive ? 'bg-emerald-800' : ""}py-2 px-3 text-white rounded-md transition-all cursor-pointer text-decoration-none`}>Shop</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'bg-emerald-800' : ""} py-2 px-3 text-white rounded-md transition-all cursor-pointer text-decoration-none`}>Contact</NavLink>
            <NavLink to="/blog" className={({ isActive }) => `${isActive ? 'bg-emerald-800' : ""} py-2 px-3 text-white rounded-md transition-all cursor-pointer text-decoration-none`}>Blog</NavLink>
          </div>

          {/* Right icons and user */}
          <div className="flex items-center gap-4 font-semibold text-base text-white relative">
            {/* Search */}
            <button onClick={() => setShowSearch(true)}>
              <FaIcon.FaSearch />
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-1">
                <span>{user.lastname}</span>
                <button onClick={toggleDropdown} className="focus:outline-none text-lg">
                  {/* <FaIcon.FaUser /> */}
                  <IoMdArrowDropdown/>
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="hover:bg-primary btn text-white">Login</NavLink>
            )}

            {/* Cart */}
            <NavLink to="/cart" className="relative">
              <FaIcon.FaShoppingCart className="text-xl text-white" />
              {items.length > 0 && (
                <span className="absolute top-[-5px] right-[-10px] bg-red-600 w-5 h-5 flex justify-center items-center rounded-full text-white text-xs">
                  {items.length}
                </span>
              )}
            </NavLink>

            {/* Mobile menu toggle */}
            <FaIcon.FaBars className="xl:hidden block text-3xl text-white cursor-pointer" onClick={toggleMenu} />
          </div>
        </nav>

        {/* Mobile nav links only */}
        <div className={`xl:hidden bg-emerald-700 w-full text-white text-lg flex flex-col border-t transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link to="/about" className="text-center py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/product" className="text-center py-2" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/contact" className="text-center py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/blog" className="text-center py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
        </div>

        {/* Unified user dropdown (mobile + desktop) */}
        {showDropdown && user && (
          <div className="absolute right-4 bg-emerald-700 text-white shadow-lg z-50 flex flex-col w-48 xl:top-14 top-20">
            <Link to="/profile" onClick={() => setShowDropdown(false)} className="px-4 py-2 text-sm hover:bg-teal-600 text-white rounded-md transition-all cursor-pointer text-decoration-none">Profile</Link>
            <Link to="/orders" onClick={() => setShowDropdown(false)} className="px-4 py-2 text-sm hover:bg-teal-600 text-white rounded-md transition-all cursor-pointer text-decoration-none">Orders</Link>
            <Link to="/profile/change-password" onClick={() => setShowDropdown(false)} className="px-4 py-2 text-sm hover:bg-teal-600 text-white rounded-md transition-all cursor-pointer text-decoration-none">Change Password</Link>
            <button onClick={handleLogout} className="text-left px-4 py-2 text-white bg-gray-100 bg-red-700">Logout</button>
          </div>
        )}

        {/* Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
              <button onClick={() => setShowSearch(false)} className="absolute top-2 right-2 text-red-500 text-xl"><IoIosCloseCircle/></button>
              <h5 className="text-lg font-semibold mb-4">Search Products</h5>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Enter product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded w-full">Search</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

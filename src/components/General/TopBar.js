import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../atoms/cartState';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../contexts/AuthContext'; 

import { notify } from './Notification';

const TopBar = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      setIsLoggedIn(false); 
      localStorage.removeItem('isAdmin');
      notify('Logged out successfully!', 'success');
      navigate('/'); 
    } catch (error) {
      notify('Failed to log out', 'error');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Ecommerce App</h1>
      <div className="flex items-center gap-4">

        <button onClick={isLoggedIn ? handleLogout : handleLogin}>
          {isLoggedIn? 'Logout' : 'Login'}
        </button>
        <Link to="/cart">
          <span className="relative">
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {cartItems.length}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

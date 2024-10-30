import React, { useState } from 'react';
import { login } from '../services/authService';
import { notify } from '../components/General/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login(email, password, setIsLoggedIn, setIsAdmin);
      if (user) {
        if (user?.email === 'admin@gmail.com') {
          navigate('/admin');
        } else {
          notify('Welcome to the Ecommerce App!', 'success');
          navigate('/');
        }
      }
    } catch (error) {
      notify('Failed to log in', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

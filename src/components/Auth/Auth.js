import React, { useState } from 'react';
import { login, logout } from '../../services/authService';
import { notify } from '../General/Notification';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/authState';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useRecoilState(authState); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);

      if (user.role === 'admin') {
        localStorage.setItem('isAdmin', 'true'); 
        notify('Logged in as admin successfully!', 'success');
        setAuth({ isLoggedIn: true, isAdmin: true }); 
        navigate('/admin'); 
      } else {
        localStorage.removeItem('isAdmin'); 
        notify('Logged in successfully!', 'success');
        setAuth({ isLoggedIn: true, isAdmin: false }); 
        navigate('/'); 
      }
    } catch (error) {
      notify('Failed to log in', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('isAdmin'); 
      notify('Logged out successfully!', 'success');
      setAuth({ isLoggedIn: false, isAdmin: false }); 
      navigate('/'); 
    } catch (error) {
      notify('Failed to log out', 'error');
    }
  };

  return (
    <div>
      {!auth.isLoggedIn ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Auth;

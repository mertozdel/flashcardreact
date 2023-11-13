import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth.js';


function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  
  const { login } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);

        login(response.data); 
        navigate('/'); // Navigate to the home page
        onLoginSuccess?.(response.data); // Optional callback
      }
    } catch (error) {
      setErrorMessage('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-field">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        <button class="button-54" role="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;

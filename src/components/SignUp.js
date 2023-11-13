import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function SignUp({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  
  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', { email, password });
      
      if (response.status === 201) {
        navigate('/login'); 
        onSignUpSuccess?.(response.data); 
      }
    } 
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to sign up. Please try again.';
      setErrorMessage(errorMessage);
    
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-field">
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={email} 
            onChange={handleChange} 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={password} 
            onChange={handleChange} 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={confirmPassword} 
            onChange={handleChange} 
            required 
            disabled={isLoading}
          />
        </div>
        <button class="button-54" role="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;

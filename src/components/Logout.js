import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth'; 

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout(); 
    navigate('/login'); 
  }, [logout, navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;

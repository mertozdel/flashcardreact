import React, { useState } from 'react';
import { updateUser } from '../../services/userService';

function UserForm({ user, onSave, onCancel }) {

  const [formData, setFormData] = useState({
    email: user ? user.email : '',

  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, formData);
      onSave({ ...formData, _id: user._id }); 
    } catch (error) {
      setError('Error updating user');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <button type="submit">Update User</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default UserForm;

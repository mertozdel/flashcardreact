import React, { useEffect, useState } from 'react';
import { listUsers, deleteUser, updateUser } from '../../services/userService';
import UserForm from './UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await listUsers();
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => {

        const updatedUsers = prevUsers.filter(user => user._id !== userId);
        setSuccess('User successfully deleted'); 
        return updatedUsers;
      });
    } catch (error) {
      setError('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (updatedUserData) => {
    try {
      if (!updatedUserData._id) {
        throw new Error('User ID is missing');
      }
      await updateUser(updatedUserData._id, updatedUserData);
      setEditingUser(null);
      await fetchUsers(); 
      setSuccess('User successfully updated');
      setError(''); 
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user');
      setSuccess(''); 
    }
  };
  

  return (
    <div>
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>} 
      {editingUser ? (
        <UserForm user={editingUser} onSave={handleUpdate} onCancel={() => setEditingUser(null)} />

      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  <button class="button-54" onClick={() => handleDelete(user._id)}>Delete</button>
                  <button class="button-54" onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

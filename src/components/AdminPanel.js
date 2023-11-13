
import React from 'react';
import UserList from './admin/UserList';


function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <UserList />
     
    </div>
  );
}

export default AdminPanel;

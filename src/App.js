import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './useAuth';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import './App.css';
import Logout from './components/Logout'; 
import UploadsPage from './components/UploadsPage';


function App() {
  return (
    <AuthProvider>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/uploadspage" element={<UploadsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        

        <Route path="/admin-panel" element={<AdminPanel />} /> 

        
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;
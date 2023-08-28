import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; 
import EditProfilePage from './pages/EditProfilePage'; 
import HomePage from './pages/HomePage'; 
import { UserProvider } from './contexts/UserContext';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <UserProvider>
  <Router>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/editprofile" element={<EditProfilePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
</UserProvider>
);

reportWebVitals();



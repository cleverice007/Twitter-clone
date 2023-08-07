import React, { useState } from 'react';
import '../css/LoginForm.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.removeItem('username');
        localStorage.setItem('username', data.username);
        window.location.href = '/home';
      } else {
        const data = await response.json();
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="login-form"> 
        <img src="/images/twitter-logo.png"  className="twitter-logo" />
        <h1>Login </h1>
      <div className="form-group">
        <label>Username：</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password：</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
  };
  

export default LoginForm;

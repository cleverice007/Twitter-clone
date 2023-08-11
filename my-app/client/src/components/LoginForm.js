import React, { useState } from 'react';
import styles from '../css/LoginForm.module.css';


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
        localStorage.removeItem('token');
        localStorage.setItem('token', data.token);
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
    <div className={styles.appContainer}>
    <form onSubmit={handleSubmit} className={styles.loginForm}> 
        <img src="/images/twitter-logo.png" className={styles.twitterLogo} alt="Twitter Logo" />
        <h1 className={styles.heading}>Login</h1>
        <div className={styles.formGroup}>
            <label className={styles.label}>Username：</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
            />
        </div>
        <div className={styles.formGroup}>
            <label className={styles.label}>Password：</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
    </form>
    </div>
);
};

export default LoginForm;

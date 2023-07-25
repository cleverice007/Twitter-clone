import React, { useState } from 'react';

const RegisterForm = () => {
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
      const response = await fetch('http://localhost:4000/auth/register ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('註冊失敗');
      }
      
      const data = await response.json();
      console.log(data); // 成功註冊後的回應資料
       // 清空表單數據
       setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;


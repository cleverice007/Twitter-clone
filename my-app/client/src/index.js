import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './pages/RegisterPage';

ReactDOM.render(
  <React.StrictMode>
    {/* 在此添加您想要渲染的頁面，例如 RegisterPage */}
    <RegisterPage />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


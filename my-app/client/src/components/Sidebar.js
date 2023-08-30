import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ul>
        <li onClick={() => navigate('/home')}>首頁</li>
        <li onClick={() => navigate('/editprofile')}>個人資料</li>
      </ul>
    </div>
  );
};

export default Sidebar;


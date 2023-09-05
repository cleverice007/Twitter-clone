import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const isCurrentPage = (pageName) => currentPage === pageName ? styles.active : '';

  return (
    <div className='sidebar'>
      <div className={styles.twitterLogo}>
        <img src="/images/twitter-logo.png" alt="Twitter" /> 
      </div>
      <ul className='styles.item-list'>
        <ul className={`${isCurrentPage('home')} ${styles.item}`} onClick={() => navigate('/home')}>
          <span className={`${styles.icon} `}>🏠</span>首頁
        </ul>
        <ul className={`${isCurrentPage('editprofile')} ${styles.item}`} onClick={() => navigate('/editprofile')}>
          <span className={`${styles.icon} `}>👤</span>個人資料
        </ul>
        <ul className={`${isCurrentPage('profile')} ${styles.item}`} onClick={() => navigate('/profile')}>
          <span className={`${styles.icon} `}>👥</span>個人主頁
        </ul>
      </ul>
    </div>
  );
  
};

export default Sidebar;


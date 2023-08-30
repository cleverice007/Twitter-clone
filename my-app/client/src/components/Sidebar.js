import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const isCurrentPage = (pageName) => currentPage === pageName ? styles.active : '';

  return (
    <div>
      <ul>
        <li className={`${isCurrentPage('home')} ${styles.item}`} onClick={() => navigate('/home')}>
          <span className={styles.icon}>🏠</span>首頁
        </li>
        <li className={`${isCurrentPage('editprofile')} ${styles.item}`} onClick={() => navigate('/editprofile')}>
          <span className={styles.icon}>👤</span>個人資料
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


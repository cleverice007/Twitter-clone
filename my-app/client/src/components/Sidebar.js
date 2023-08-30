import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const isCurrentPage = (pageName) => currentPage === pageName ? 'text-blue-600' : '';

  return (
    <div className="bg-gray-900 text-white p-4">
      <ul className="space-y-4">
        <li className={`hover:bg-blue-800 rounded-lg p-2 ${isCurrentPage('home')}`} onClick={() => navigate('/home')}>
          <span className="text-lg font-semibold">🏠</span>首頁
        </li>
        <li className={`hover:bg-blue-800 rounded-lg p-2 ${isCurrentPage('editprofile')}`} onClick={() => navigate('/editprofile')}>
          <span className="text-lg font-semibold">👤</span>個人資料
        </li>
      </ul>
    </div>
  );
};


export default Sidebar;


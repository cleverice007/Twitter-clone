import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userCardStyles from '../css/RecommendedUsers.module.css'; 

const RecommendedUsers = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    fetchRecommendedUsers();
  }, []);

  const fetchRecommendedUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/recommend/recommend-users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Server Error');
        return;
      }

      const data = await response.json();
      setRecommendedUsers(data.recommendedUsers);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2 className={userCardStyles.title}>推薦用戶</h2>
      <div className={`${userCardStyles['recommended-users-container']} ${userCardStyles.container}`}>
        {recommendedUsers.map(user => (
          <div key={user._id} className={`${userCardStyles['user-card']} ${userCardStyles.userCard}`}>
            <img src={user.profileImage} alt={`Profile of ${user.username}`} />
            <h3>{user.username}</h3>
            <p>{user.followers.length} Followers</p>
            <Link to={`/profile/${user.username}`}>查看個人頁面</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedUsers;

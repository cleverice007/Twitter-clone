import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userCardStyles from '../css/RecommendedUsers.module.css';
import axios from 'axios';

const RecommendedUsers = (following) => {
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


  // 跟隨、取消跟隨用戶的request
  const followUnfollowUser = async (followingId) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const payload = {
        userId: followingId // 要跟隨或取消跟隨的用戶 ID
      };

      const response = await axios.put('http://localhost:4000/${userId}/follow', payload, config);

      if (response.status === 200) {
        console.log('Follow/Unfollow successful', response.data.following);

        // 更新前端的狀態（比如更新 following 陣列）
      }
    } catch (error) {
      console.error('Error in follow/unfollow:', error);
    }
  };


  return (
    <div>
      <h2 className={userCardStyles.title}>推薦用戶</h2>
      <div className={`${userCardStyles['recommended-users-container']} ${userCardStyles.container}`}>
        {recommendedUsers.map(user => (
          <Link to={`/profile/${user.username}`} key={user._id}>
            <div className={`${userCardStyles['user-card']} ${userCardStyles.userCard}`}>
              <img src={user.profileImage} alt={`Profile of ${user.username}`} />
              <h3>{user.username}</h3>
              <button onClick={()=>followUnfollowUser(user._id)}>
                {following.followingids && following.followingids.includes(user._id) ? '已跟隨' : '跟隨'}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default RecommendedUsers;

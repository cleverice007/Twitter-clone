import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userCardStyles from '../css/RecommendedUsers.module.css';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';


const RecommendedUsers = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    fetchRecommendedUsers();
  }, []);

  const { username, profileImageUrl, followers, following } = useUser();

  const fetchRecommendedUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('${API_BASE_URL}/recommend/recommend-users', {
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
  const followUnfollowUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const payload = {
        followingId: userId // 要跟隨或取消跟隨的用戶 ID
      };

      const response = await axios.put(`${API_BASE_URL}/auth/${userId}/follow`, payload, config);

      if (response.status === 200) {
        console.log('Follow/Unfollow successful', response.data.following);

      }
    } catch (error) {
      console.error('Error in follow/unfollow:', error);
    }
  };


  return (
    <div>
      <h3 className={userCardStyles.title}>推薦用戶</h3>
      <div className={`${userCardStyles['recommended-users-container']} ${userCardStyles.container}`}>
        {recommendedUsers.map(user => (
          <div style={{ position: 'relative' }} key={user._id}>
            <Link to={`/profile/${user.username}`}>
              <div className={`${userCardStyles['user-card']} ${userCardStyles.userCard}`}>
                <img src={`${API_BASE_URL}/${user.profileImage}`} alt={`Profile of ${user.username}`} />
                <h3>{user.username}</h3>
              </div>
            </Link>
            <button className={`${userCardStyles.followBtn}`}
              onClick={() => followUnfollowUser(user._id)}
            >
              {following && following.includes(user._id) ? '已跟隨' : '跟隨'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
  

};

export default RecommendedUsers;

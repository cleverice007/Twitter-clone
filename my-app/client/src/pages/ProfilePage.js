import React, { useState, useEffect } from 'react';
import styles from '../css/ProfilePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';
import { useLocation } from 'react-router-dom';


const ProfilePage = () => {
  const location = useLocation();
  // const { otherUsername } = useParams();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');


  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImageUrl(`http://localhost:4000/${data.profileImage}`);
        setBackgroundImageUrl(`http://localhost:4000/${data.backgroundImage}`);
        setIntroduction(data.introduction);
        setfollowers(data.followers);
        setfollowing(data.following);
        console.log(introduction)

      } else {
        // 處理錯誤情況
        console.error('Error fetching profile:', await response.text());
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);





  

  return (
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        {/* Profile Info Upper */}
        <div className={styles.profileInfoUpper}>
          {/* Background Image */}
          <div className={styles.backgroundImage} style={{ backgroundImage: `url(${backgroundImageUrl})` }}></div>

          {/* Avatar and Edit Button */}
          <div className={styles.profileImageEditContainer}>
            {/* Avatar */}
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImage} style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
            </div>

            {/* Edit Profile Button */}
            <button className={styles.editButton}>編輯個人資料</button>
          </div>
        </div>

        {/* Introduction */}
        <div className={styles.introduction}>
          <h2>{username ? `@${username}` : 'Welcome to Twitter Clone'}</h2>
          <p>{introduction}</p>
          <div className={styles.followStats}>
            <p>Followers: {followers?.length || 0}</p>
            <p>Following: {following?.length || 0}</p>

          </div>
        </div>

        {/* Tweet Section */}
        <div className={styles.tweets}>
          <h1>Welcome {username ? username : 'to Twitter Clone'}</h1>
          {location.pathname.startsWith('/profile/') ? null : <TweetBox />}
          <Tweets tweets />
        </div>

      </div>

      {/* Recommended Users */}
      <div className={styles.recommendedUsersWrapper}>
        <RecommendedUsers following = {following} />
      </div>
    </div>
  );


};


export default ProfilePage;

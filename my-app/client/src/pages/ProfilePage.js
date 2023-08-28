import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/ProfilePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';
import  { useUser }from '../contexts/UserContext';

const ProfilePage = () => {
  const location = useLocation();
  const { profileImageUrl, backgroundImageUrl, introduction, followers, following, followingUsersInfo } =useUser();
  
  let username = localStorage.getItem('username');
  let userForProfile = { profileImage: profileImageUrl, backgroundImage: backgroundImageUrl, introduction }; // default 是 user 自己的資料
  
  if (location.pathname.startsWith('/profile/')) {
    // 從URL 得到其他用戶username
    const otherUsername = location.pathname.split('/').pop();
    
    const otherUser = followingUsersInfo.find(user => user.username === otherUsername);
    
    if (otherUser) {
      userForProfile = otherUser;
      username = otherUsername;
    }
  }

  return (
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        {/* Profile Info Upper */}
        <div className={styles.profileInfoUpper}>
          {/* Background Image */}
          <div className={styles.backgroundImage} style={{ backgroundImage: `url(${userForProfile.backgroundImage})` }}></div>

          {/* Avatar and Edit Button */}
          <div className={styles.profileImageEditContainer}>
            {/* Avatar */}
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImage} style={{ backgroundImage: `url(${userForProfile.profileImage})` }}></div>
            </div>

            {/* Edit Profile Button */}
            <button className={styles.editButton}>編輯個人資料</button>
          </div>
        </div>

        {/* Introduction */}
        <div className={styles.introduction}>
          <p>{userForProfile.introduction}</p>
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
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default ProfilePage;




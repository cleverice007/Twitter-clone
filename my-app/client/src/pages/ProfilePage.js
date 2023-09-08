import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/ProfilePage.module.css';
import Sidebar from '../components/Sidebar';
import Tweets from '../components/Tweets';
import TweetBox from '../components/TweetBox';
import RecommendedUsers from '../components/RecommendedUsers';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const location = useLocation();
  const { profileImageUrl, backgroundImageUrl, introduction, followers, following, followingUsersInfo } = useUser();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  let username = localStorage.getItem('username');
  let userForProfile = { profileImage: profileImageUrl, backgroundImage: backgroundImageUrl, introduction }; // default 是 user 自己的資料

  if (location.pathname.startsWith('/profile/')) {
    // 從URL 得到其他用戶username
    const otherUsername = location.pathname.split('/').pop();

    const otherUser = followingUsersInfo.find(user => user.username === otherUsername);

    if (otherUser.backgroundImage && !otherUser.backgroundImage.startsWith('data:image/jpeg;base64,')) {
      otherUser.backgroundImage = `data:image/jpeg;base64,${otherUser.backgroundImage}`;
    }
  
    if (otherUser.profileImage && !otherUser.profileImage.startsWith('data:image/jpeg;base64,')) {
      otherUser.profileImage = `data:image/jpeg;base64,${otherUser.profileImage}`;
    }
  
    userForProfile = otherUser;
    username = otherUsername;
    }
  }


  return (
    <div class="bg-blue-900">
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>

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


          </div>
        </div>

        {/* Introduction */}
        <div className={styles.introduction}>
          <p>{userForProfile.introduction}</p>
        </div>
        <div className={styles.followStats}>
            <p>Followers: {followers?.length || 0}</p>
            <p>Following: {following?.length || 0}</p>
        </div>

        {/* Tweet Section */}
        {location.pathname.endsWith('/profile') && <TweetBox />}

        <div className={styles.tweets}>
          <Tweets tweets />
        </div>

      </div>

      {/* Recommended Users */}
      <div className={styles.recommendedUsersWrapper}>
        <RecommendedUsers />
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;




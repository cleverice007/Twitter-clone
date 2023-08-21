import React from 'react';
import styles from '../css/ProfilePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';

const ProfilePage = () => {
  const username = localStorage.getItem('username');

  // Define the image URLs and introduction
  const avatarUrl = '/images/mason.jpg';
  const backgroundImageUrl = '/images/background.jpg';
  const introduction = 'i major in finance, i try to code for 3 months .';


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
          <div className={styles.avatarEditContainer}>
            {/* Avatar */}
            <div className={styles.avatarContainer}>
              <div className={styles.avatar} style={{ backgroundImage: `url(${avatarUrl})` }}></div>
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
            <p>Followers: 100</p>
            <p>Following: 50</p>
          </div>
        </div>
        
        {/* Tweet Section */}
        <div className={styles.tweets}>
          <h1>Welcome {username ? username : 'to Twitter Clone'}</h1>
          <TweetBox />
          <Tweets tweets />
        </div>
      </div>
      
      {/* Recommended Users */}
      <div className={styles.recommendedUsersWrapper}>
        <RecommendedUsers />
        {/* Display recommended users */}
      </div>
    </div>
  );
  

};


export default ProfilePage;

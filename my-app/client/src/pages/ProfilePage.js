import React from 'react';
import styles from '../css/ProfilePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';

const ProfilePage = () => {
  const username = localStorage.getItem('username');

  // Define the image URLs and introduction
  const avatarUrl = '/images/mason.jpg';
  const introduction = 'i major in finance, i try to code for 3 months .';

  return (
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        {/* Avatar */}
        <div className={styles.avatarContainer}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatarUrl})` }}></div>
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
    </div>
  );
};

export default ProfilePage;

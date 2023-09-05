import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/HomePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';
import { useUser } from '../contexts/UserContext';


const HomePage = () => {
  const location = useLocation();
  return (
    <div className={styles.homePage}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={styles.tweetWrapper}>
      <div className={styles.tweetBoxWrapper}>
        <TweetBox />
      </div>
      {/* Tweet Section */}
      <div className={styles.tweets}>
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

export default HomePage;










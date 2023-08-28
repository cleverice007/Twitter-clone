import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/HomePage.module.css';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';
import  { useUser }from '../contexts/UserContext';


const HomePage = () => {
  const location = useLocation(); // 你忘記了這一行，以獲取 location 物件

  return (
    <div className={styles.homePage}>
      {/* Tweet Section */}
      <div className={styles.tweets}>
        <Tweets tweets />
      </div>
      {/* Recommended Users */}
      <div className={styles.recommendedUsersWrapper}>
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default HomePage;










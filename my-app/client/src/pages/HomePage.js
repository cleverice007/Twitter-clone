import React, { useEffect, useState } from 'react';
import styles from '../css/HomePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';

const HomePage = () => {
  const username = localStorage.getItem('username');


  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.tweets}>
        <h1>Welcome {username ? username : 'to Twitter Clone'}</h1>
        <TweetBox />
        <Tweets tweets />
      </div>
      <div className={styles.recommendedUsersWrapper}>
      </div>
    </div>
);
  };


export default HomePage;

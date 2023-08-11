import React, { useEffect, useState } from 'react';
import styles from '../css/HomePage.module.css';
import Sidebar from '../components/Sidebar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import RecommendedUsers from '../components/RecommendedUsers';

const HomePage = () => {
  const username = localStorage.getItem('username');
  const [tweets, setTweets] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    fetchTweets();
    fetchRecommendedUsers();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:4000/tweets');
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchRecommendedUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/recommended-users');
      if (!response.ok) {
        throw new Error('Failed to fetch recommended users');
      }
      const data = await response.json();
      setRecommendedUsers(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.tweets}>
        <h1>Welcome {username ? username : 'to Twitter Clone'}</h1>
        <TweetBox  token={token} />
        <Tweets tweets={tweets} />
      </div>
      <div className={styles.recommendedUsersWrapper}>
        <RecommendedUsers users={recommendedUsers} />
      </div>
    </div>
);
  };


export default HomePage;

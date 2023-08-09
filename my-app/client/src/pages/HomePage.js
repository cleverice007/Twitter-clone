import React, { useEffect, useState } from 'react';
import styles from '../css/HomePage.module.css';

const HomePage = () => {
  const username = localStorage.getItem('username');
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState("");
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

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <ul>
          <li>首頁</li>
          <li>個人資料</li>
        </ul>
      </div>

      {/* Tweets */}
      <div className={styles.tweets}>
        <h1>Welcome {username ? username : 'to Twitter Clone'}</h1>
        
        <textarea 
          placeholder="What's happening?"
          value={tweetInput}
          onChange={(e) => setTweetInput(e.target.value)}
          className={styles.tweetInput}
        />
        <button>Post</button>

        <h2>Tweets</h2>
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet._id}>
              <p>{tweet.text}</p>
              <p>Author: {tweet.author}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Users */}
      <div className={styles.recommendedUsers}>
        <h2>Recommended Users</h2>
        <ul>
          {recommendedUsers.map((user) => (
            <li key={user._id}>
              <p>{user.username}</p>
              <p>Name: {user.name}</p>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default HomePage;

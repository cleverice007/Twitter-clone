import React, { useEffect, useState } from 'react';
import styles from '../css/Tweets.module.css';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:4000/getTweets', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Server Error');
        return;
      }

      const data = await response.json();
      setTweets(data.userTweets);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.tweets}>
      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <p>{tweet.content}</p>
            <p>Author: {tweet.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tweets;

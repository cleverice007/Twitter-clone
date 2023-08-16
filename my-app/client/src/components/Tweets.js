import React, { useEffect, useState } from 'react';
import styles from '../css/Tweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';


const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:4000/tweets/getTweets', {
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

  const handleComment = async (tweetId) => {
  };


  const handleLike = async (tweetId) => {

  }

  return (
    <div className={styles.tweets}>
      <h2>貼文</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <p>{tweet.content}</p>
            <p>作者：{tweet.author.username}</p>
            <div className={styles.iconContainer}>
              <button className={styles.iconButton} onClick={() => handleLike(tweet._id)}>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                {tweet.likes.length}
              </button>
              <button className={styles.iconButton} onClick={() => handleComment(tweet._id)}>
                <FontAwesomeIcon icon={faComment} className={styles.icon} />
                {tweet.comments.length}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Tweets;

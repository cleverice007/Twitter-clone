import { useState } from 'react';
import styles from '../css/TweetBox.module.css';
import { useUser } from '../contexts/UserContext';


const TweetBox = () => { 
  const [tweetInput, setTweetInput] = useState("");
  const { profileImageUrl, backgroundImageUrl, introduction, followers, following, followingUsersInfo } = useUser();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';


  const handlePost = async () => {
    if (!tweetInput.trim()) {
      console.error('Tweet content is empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tweets/createTweet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 在請求標頭中加入 JWT 令牌
        },
        body: JSON.stringify({ content: tweetInput }),
        credentials: 'include'
      });
      
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData.message);
        throw new Error('Failed to post tweet');
      }


      const data = await response.json();
      setTweetInput("");
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

  return (
    <div className={styles.tweetBox}>
      <img 
        src={profileImageUrl} 
        alt="Profile" 
        className={styles.profileImage}
      />
      <textarea 
        placeholder="What's happening?"
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
        className={styles.tweetInput}
      />
      <button onClick={handlePost} className={styles.tweetButton}>Tweet</button>
    </div>
  );
  
  
}

export default TweetBox;


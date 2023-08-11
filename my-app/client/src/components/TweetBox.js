import { useState } from 'react';
import styles from '../css/TweetBox.module.css';

const TweetBox = ({ token }) => { // 將用戶的 JWT 令牌作為參數傳遞進來
  const [tweetInput, setTweetInput] = useState("");

  const handlePost = async () => {
    if (!tweetInput.trim()) {
      console.error('Tweet content is empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/tweets/createTweet', {
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
      <textarea 
        placeholder="What's happening?"
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
        className={styles.tweetInput}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default TweetBox;


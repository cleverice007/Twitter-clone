import { useState } from 'react';
import styles from '../css/TweetBox.module.css';

const TweetBox = ({ onPost }) => {
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
        },
        body: JSON.stringify({ content: tweetInput })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData.message);
        throw new Error('Failed to post tweet');
      }


      const data = await response.json();
      onPost(data);  // Inform the parent about the new tweet
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


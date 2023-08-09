import { useState } from 'react';
import styles from '../css/TweetBox.module.css';

const TweetBox = ({ onPost }) => {
  const [tweetInput, setTweetInput] = useState("");

  const handlePost = () => {
    onPost(tweetInput);
    setTweetInput("");
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

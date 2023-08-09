import styles from '../css/Tweets.module.css';

const Tweets = ({ tweets }) => {
  return (
    <div className={styles.tweets}>
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
  );
}

export default Tweets;

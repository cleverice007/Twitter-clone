import React, { useEffect, useState } from 'react';
import styles from '../css/Tweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';


const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentUsername, setCommentUsername] = useState('');



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

  const handleCommentButtonClick = (tweetId) => {
    const selectedTweet = tweets.find(tweet => tweet._id === tweetId);
    setSelectedTweet(selectedTweet);
    setShowCommentModal(true);
  };



  const handleCloseModal = () => {
    setSelectedTweet(null);
    setShowCommentModal(false);
    setCommentText('');
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      console.error('Comment content is empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/tweets/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tweetId: selectedTweet._id,
          content: commentText,
          createdAt: new Date()
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Server Error');
        return;
      }
      const responseData = await response.json();
      setCommenUsername(responseData.comment_username);

      // 重置評論文本框
      setCommentText('');
      // 關閉 modal
      setShowCommentModal(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const handleLike = async (tweetId) => { }



  const handleComment = async (tweetId) => { }

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
              <button className={styles.iconButton} onClick={() => handleCommentButtonClick(tweet._id)}>
                <FontAwesomeIcon icon={faComment} className={styles.icon} />
                {tweet.comments.length}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Comment Modal */}
      <Modal
        isOpen={showCommentModal}
        onRequestClose={handleCloseModal}
        contentLabel="Comment Modal"
      >
        <h3>內容</h3>
        <p>{selectedTweet?.content}</p>
        <h3>評論</h3>
        <div>
          {selectedTweet && selectedTweet.comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.content}</p>
              <p>評論者：{commentUsername}</p>
              <p>評論時間：{new Date(comment.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}</p>
            </div>
          ))}
        </div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>提交評論</button>
        <button onClick={handleCloseModal}>關閉</button>
      </Modal>


    </div>
  );

}

export default Tweets;

import React, { useEffect, useState } from 'react';
import styles from '../css/Tweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';


const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [commentText, setCommentText] = useState('');
  const location = useLocation();




  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.pathname === '/profile') {
      fetchTweets();
    } else if (location.pathname.startsWith('/profile/')) {
      const userId = location.pathname.split('/').pop();
      fetchOtherTweets(userId);
    }
  }, [location.pathname]);

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
      const initialTweets = data.userTweets.map(tweet => ({ ...tweet, isLiked: false })); // 初始時每則貼文都設定為未按讚
      setTweets(initialTweets);
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
      const response = await fetch(`http://localhost:4000/tweets/${selectedTweet._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: commentText,
          createdAt: new Date()
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Server Error');
        return;
      }

      // 重置評論文本框
      setCommentText('');
      // 關閉 modal
      setShowCommentModal(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const token = localStorage.getItem('token');
  
      // 發送按讚請求到後端
      const response = await fetch(`http://localhost:4000/tweets/like/${tweetId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        console.error('Server Error');
        return;
      }
  
      // 更新按讚狀態
      setTweets(prevTweets => {
        return prevTweets.map(tweet => {
          if (tweet._id === tweetId) {
            // 切換按讚狀態
            return { ...tweet, isLiked: !tweet.isLiked };
          }
          return tweet;
        });
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const fetchOtherTweets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/tweets/${userId}`);
  
      if (!response.ok) {
        console.error('Server Error');
        return;
      }
  
      const data = await response.json();
      const otherUserTweets = data.userTweets.map(tweet => ({ ...tweet, isLiked: false }));
      setTweets(otherUserTweets);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  


  return (
    <div className={styles.tweets}>
      <h2>貼文</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <p>{tweet.content}</p>
            <p>作者：{tweet.author.username}</p>
            <p>
              {new Date(tweet.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
            <div className={styles.iconContainer}>
              <button
                className={`${styles.iconButton} ${tweet.isLiked ? styles.liked : ''}`}
                onClick={() => handleLike(tweet._id)}
              >
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
              <p>評論者：{comment.userId.username}</p>
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

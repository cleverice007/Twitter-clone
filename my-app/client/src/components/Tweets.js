import React, { useEffect, useState } from 'react';
import styles from '../css/Tweets.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';


const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [commentText, setCommentText] = useState('');
  const location = useLocation();
  const { profileImageUrl, backgroundImageUrl, introduction, followers, following, followingUsersInfo,username } = useUser();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';




  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.pathname === '/profile') {
      fetchTweets();
    } else if (location.pathname.startsWith('/profile/')) {
      const username = location.pathname.split('/').pop();
      fetchOtherTweets(username);
    } else if (location.pathname === '/home') {
      fetchFollowingTweets(following);
    }
  }, [location.pathname, following]);

  const fetchTweets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tweets/getTweets`, {
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
      const initialTweets = data.userTweets.map(tweet => ({
        ...tweet,
        isLiked: tweet.likes.some(like => like.username === tweet.username) // 判斷是否已經按過贊
      }));
      setTweets(initialTweets);      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const fetchOtherTweets = async (otherUsername) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tweets/${otherUsername}`);

      if (!response.ok) {
        console.error('Server Error');
        return;
      }

      const data = await response.json();
      const otherUserTweets = data.otherUserTweets.map(tweet => ({
        ...tweet,
        isLiked: tweet.likes.some(like => like.username === username) // 判斷是否已經按過贊
      }));
      setTweets(otherUserTweets);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const fetchFollowingTweets = async (following) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tweets/followingTweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following }),
      });

      const data = await response.json();
      const followingTweets = data.followingTweets.map(tweet => ({
        ...tweet,
        isLiked: tweet.likes.some(like => like.username === tweet.username) // 判斷是否已經按過贊
      }));
      setTweets(followingTweets);

    } catch (error) {
      console.error("Failed to fetch following tweets:", error);
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

  const handleCommentSubmit = async (tweetId) => {
    if (!commentText.trim()) {
      console.error('Comment content is empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tweets/${tweetId}/comments`, {
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
      const response = await fetch(`${API_BASE_URL}/tweets/like/${tweetId}`, {
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


  return (
    <div className={styles.tweets}>
      <h2>貼文</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <div className={styles.tweetContainer}>
              <div className={styles.profileImageContainer}>
                <img src={`${API_BASE_URL}/${tweet.author.profileImage}`} alt="profile" className={styles.profileImage} />
              </div>
              <div className={styles.tweetContent}>
                <div className={styles.tweetHeader}>
                  <p>{tweet.author.username}</p>
                  <p>
                    {new Date(tweet.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </p>
                </div>
                <p>{tweet.content}</p>
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
              </div>
            </div>

          </li>
        ))}
        {/* Comment Modal */}
        <Modal
          className={styles.modal}
          isOpen={showCommentModal}
          onRequestClose={handleCloseModal}
          contentLabel="Comment Modal"
        >
          <div className={styles.modalContent}>
            {selectedTweet ? (
              <div className={styles.tweetContainer}>
                <div className={styles.profileImageContainer}>
                  <img src={`${API_BASE_URL}/${selectedTweet.author.profileImage}`} alt="profile" className={styles.profileImage} />
                </div>
                <div className={styles.tweetContent}>
                  <div className={styles.tweetHeader}>
                    <p>{selectedTweet.author.username}</p>
                    <p>
                      {new Date(selectedTweet.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </p>
                  </div>
                  <p>{selectedTweet.content}</p>
                </div>
              </div>
            ) : (
              <div>Loading or tweet not found...</div>
            )}

            {/* Comment Textarea */}

            <div className={styles.tweetBox}>
              <img
                src={profileImageUrl}
                alt="Profile"
                className={styles.profileImage}
              />
              <textarea
                placeholder="Leave your comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={styles.tweetInput}
              />
              <button className={styles.commentButton} onClick={() => handleCommentSubmit(selectedTweet._id)}>提交評論</button>
              <button className={styles.commentButton} onClick={handleCloseModal}>關閉</button>

            </div>

            {/* Comment Display*/}

            <h3>評論</h3>
            <div>
              {selectedTweet && selectedTweet.comments.map((comment, index) => (
                <div key={index} className={styles.commentContainer}>
                  <img
                    src={`${API_BASE_URL}/${comment.userId.profileImage}`}
                    alt="commenter profile"
                    className={styles.commentProfileImage}
                  />
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <p>{comment.userId.username}</p>
                      <p>{new Date(comment.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}</p>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </Modal>

      </ul>
    </div>
  );



}

export default Tweets;

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    fetchTweets();
    fetchRecommendedUsers();
    fetchFlashMessage();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:4000/tweets');
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchRecommendedUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/recommended-users');
      if (!response.ok) {
        throw new Error('Failed to fetch recommended users');
      }
      const data = await response.json();
      setRecommendedUsers(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchFlashMessage = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/flash-message');
      if (!response.ok) {
        throw new Error('Failed to get flash message');
      }
      const data = await response.json();
      if (data.successMessage.length > 0) {
        toast.success(data.successMessage[0]);
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error: ' + error.message);
    }
  };
  return (
    <div>
      {/* 將 ToastContainer 放在此處，這是顯示 Toast 的容器元件 */}
      <ToastContainer />

      <h1>Welcome to Twitter Clone</h1>

      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <p>{tweet.text}</p>
            <p>Author: {tweet.author}</p>
          </li>
        ))}
      </ul>

      <h2>Recommended Users</h2>
      <ul>
        {recommendedUsers.map((user) => (
          <li key={user._id}>
            <p>{user.username}</p>
            <p>Name: {user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;


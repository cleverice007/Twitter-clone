import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const UserContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Custom hook for other components to use this context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const fetchFromAPI = async () => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, config);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const [introduction, setIntroduction] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingUsersInfo, setFollowingUsersInfo] = useState([]);

  useEffect(() => {
    // This is a function to fetch user information
    const fetchUserInfo = async () => {
      const data = await fetchFromAPI();
      if (data) {
        setUsername(data.username);
        setProfileImageUrl(`data:image/jpeg;base64,${data.profileImage}`);
        setBackgroundImageUrl(`data:image/jpeg;base64,${data.backgroundImage}`);
        setFollowing(data.following);
        setIntroduction(data.introduction);
      }
    };

    // This is a function to fetch user's follwing users information

    const fetchFollowingUsersInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get(`${API_BASE_URL}/auth/followingProfile`, config);

        if (response.data) {
          setFollowingUsersInfo(response.data.followingUsers);
        }
      } catch (error) {
        console.error('Error fetching following users info:', error);
      }
    };



    fetchUserInfo();
    fetchFollowingUsersInfo();
  }, []);

  // Assuming "value" includes all the states and methods you want to provide
  const value = {
    username,
    profileImageUrl,
    backgroundImageUrl,
    followers,
    following,
    followingUsersInfo,
    introduction
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


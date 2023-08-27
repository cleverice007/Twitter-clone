import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


// 創建 context
const UserContext = createContext();

// 自訂的 hook，方便其他組件使用這個 context
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

    const response = await axios.get('http://localhost:4000/auth/profile', config);

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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // 這是一個獲取用戶資訊的函數
    const fetchUserInfo = async () => {
      const data = await fetchFromAPI(); 
      if (data) {
        setUsername(data.username); 
        setProfileImageUrl(`http://localhost:4000/${data.profileImage}`);
        setBackgroundImageUrl(`http://localhost:4000/${data.backgroundImage}`);      
        setFollowing(data.following);
      }
    };

    fetchUserInfo();
  }, []);

  const value = {
    username,
    setUsername,
    profileImageUrl,
    setProfileImageUrl,
    followers,
    setFollowers,
    following,
    setFollowing,
    backgroundImageUrl,
    setBackgroundImageUrl
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


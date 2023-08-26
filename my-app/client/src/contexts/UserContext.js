import React, { createContext, useContext, useState } from 'react';

// 創建一個 context
const UserContext = createContext();

// 自訂的 hook，方便其他組件使用這個 context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const value = {
    username,
    setUsername,
    profileImage,
    setProfileImage,
    followers,
    setFollowers,
    following,
    setFollowing,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

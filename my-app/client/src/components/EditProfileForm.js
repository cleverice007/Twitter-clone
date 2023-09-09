import React, { useState, useRef } from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';
import styles from '../css/EditProfileForm.module.css';
import  { useUser }from '../contexts/UserContext';

function EditProfileForm() {
  // 創建一個表單參考
  const formRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';


  const defaultProfileImageURL = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
  const defaultBackgroundImageURL = 'https://img.freepik.com/free-photo/abstract-gray-oil-paint-textured-background_53876-129925.jpg?w=2000';
  const username = localStorage.getItem('username');
  const { profileImageUrl, backgroundImageUrl, introduction: userIntroduction, followers, following, followingUsersInfo } =useUser();


  const [profileImageFile, setProfileImageFile] = useState(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(
    profileImageUrl 
      ? profileImageUrl
      : defaultProfileImageURL
  );
  const [backgroundImageURL, setBackgroundImageURL] = useState(
    backgroundImageUrl 
      ? backgroundImageUrl
      : defaultBackgroundImageURL
  );
  
  const [introduction, setIntroduction] = useState(userIntroduction || '');

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setProfileImageFile(base64String);
        
        // 預覽 URL
        const previewUrl = URL.createObjectURL(file);
        setProfileImageURL(previewUrl);
      };
    }
  };
  
  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setBackgroundImageFile(base64String);
        
        // 預覽 URL
        const previewUrl = URL.createObjectURL(file);
        setBackgroundImageURL(previewUrl);
      };
    }
  };
  
  

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
    
    // 添加選擇的文件和文本字段到 FormData
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
  
    if (backgroundImageFile) {
      formData.append('backgroundImage', backgroundImageFile);
    }
    
    formData.append('introduction', introduction);
  
    try {
      const response = await fetch(`${API_BASE_URL}/auth/updateProfile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData 
      });
  
      if (response.ok) {
        const data = await response.json();
        window.location.href = '/profile';
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  return (
    <>
      <nav className={styles.navbar}>
        <div></div>
        <div>編輯個人資料</div>
        <input type="button" value="儲存" onClick={handleSubmit} />
      </nav>

  
      <div className={styles['center-form']}>
        <form ref={formRef}>
          <div className={styles.imageContainer}>
            <BackgroundImageUpload onImageChange={handleBackgroundImageChange} backgroundImageURL={backgroundImageURL} />
            <ProfileImageUpload onImageChange={handleProfileImageChange} profileImageURL={profileImageURL} />
          </div>
          <div className={styles['inline-text']}> 
            <span >名稱：</span>
            <span className={styles['rounded-span']}>{username || ' '}</span>
          </div>
          <div className={styles['inline-text']}> 
            <span>Introduction: </span>
          </div>
          <div className={styles.textAreaContainer}>
          <textarea
            className={`${styles['rounded-textarea']} ${!introduction && styles.placeholder}`}
            name="introduction"
            rows="5" 
            cols="50"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Introduce yourself..."
          />
        </div>
        </form>
      </div>
    </>
  );



}


export default EditProfileForm;



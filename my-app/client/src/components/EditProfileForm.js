import React, { useState, useRef } from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';
import styles from '../css/EditProfileForm.module.css';
import  { useUser }from '../contexts/UserContext';

function EditProfileForm() {
  // 創建一個表單參考
  const formRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';


  const defaultProfileImageURL = '/images/default_profileimage.png';
  const defaultBackgroundImageURL = '/images/default_backgroundimage.png';
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
      setProfileImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImageURL(previewUrl);

    }
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setBackgroundImageURL(previewUrl);
    }
  };


  const handleSubmit = async () => {
    const form = formRef.current;
    if (!form) return;

    const token = localStorage.getItem('token');

    // 收集表單數據
    const formData = new FormData(form);
    formData.append('profileImage', profileImageFile);
    formData.append('backgroundImage', backgroundImageFile);
    formData.append('introduction', introduction);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/updateProfile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // 使用FormData作為請求主體
        credentials: 'include'
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



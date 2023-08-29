import React, { useState } from 'react'; // 引入 useState
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';

function EditProfileForm() {

  const defaultProfileImageURL = 'client/public/images/default_profileimage.png';
  const [profileImageFile, setProfileImageFile] = useState(defaultProfileImageURL);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [backgroundImageURL, setBackgroundImageURL] = useState(null);

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
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    // 收集表單數據
    const formData = new FormData();
    formData.append('profileImage', profileImageFile);
    formData.append('backgroundImage', backgroundImageFile);
    formData.append('introduction', event.target.introduction.value);

    try {
      const response = await fetch(`http://localhost:4000/auth/updateProfile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // 使用FormData作為請求主體
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = 'http://localhost:3000/profile';

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
    <form onSubmit={handleSubmit}>
      <h2>Profile Image</h2>
      <ProfileImageUpload onImageChange={handleProfileImageChange} profileImageURL={profileImageURL} />

      <h2>Background Image</h2>
      <BackgroundImageUpload onImageChange={handleBackgroundImageChange} backgroundImageURL={backgroundImageURL} />

      <h2>Introduction</h2>
      <textarea
        name="introduction"
        rows="4"
        cols="50"
        placeholder="Introduce yourself..."
      />
      <input type="submit" onSubmit={handleSubmit} />
    </form>
  );
}


export default EditProfileForm;



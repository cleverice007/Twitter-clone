import React, { useState } from 'react'; // 引入 useState
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';

function EditProfileForm() {
  const [profileImageURL, setProfileImageURL] = useState('');
  const [backgroundImageURL, setBackgroundImageURL] = useState('');

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImageURL(imageUrl); 
    }
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImageURL(imageUrl); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 收集表單數據
    const formData = new FormData();
    formData.append('profileImage', profileImageURL);
    formData.append('backgroundImage', backgroundImageURL);
    formData.append('introduction', event.target.introduction.value);

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile Image</h2>
      <ProfileImageUpload onImageChange={handleProfileImageChange} profileImageUrl={profileImageURL} /> 

      <h2>Background Image</h2>
      <BackgroundImageUpload onImageChange={handleBackgroundImageChange} backgroundImageUrl={backgroundImageURL} />

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



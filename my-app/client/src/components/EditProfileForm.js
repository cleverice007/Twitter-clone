import React from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';

function EditProfileForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile Image</h2>
      <ProfileImageUpload />

      <h2>Background Image</h2>
      <BackgroundImageUpload />

      <h2>Introduction</h2>

    </form>
  );
}

export default EditProfileForm;



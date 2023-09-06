import React, { useState } from 'react';
import styles from '../css/ProfileImageUpload.module.css';

function ProfileImageUpload(props) {
    const { onImageChange, profileImageURL } = props;
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';


    return (
        <div className={styles.profileImageUpload}>
        {profileImageURL ? (
          <img src={profileImageURL} alt="Profile" className={styles.profileImage} />
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className={styles.profileInput}
          id="profileImage"
        />
        <label htmlFor="profileImage" className={styles.uploadButton}>
          Upload Image
        </label>
      </div>
    );

}

export default ProfileImageUpload;



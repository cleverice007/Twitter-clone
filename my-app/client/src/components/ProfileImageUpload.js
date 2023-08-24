import React, { useState } from 'react';
import styles from '../css/ProfileImageUpload.module.css';

function ProfileImageUpload(onImageChange, profileImageUrl) {



    return (
        <div className={styles.profileImageUpload}>
            {profileImageUrl && (
                <img
                    src={profileImageUrl}
                    alt="Profile"
                    className={styles.profileImage}
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className={styles.input}
                id="profileImage"
            />

            <label htmlFor="profileImage" className={styles.uploadButton}>
                Upload Image
            </label>

        </div>
    );

}

export default ProfileImageUpload;



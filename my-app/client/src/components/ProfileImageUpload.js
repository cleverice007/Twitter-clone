import React, { useState } from 'react';
import styles from '../css/ProfileImageUpload.module.css';

function ProfileImageUpload() {
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImageUrl(imageUrl);
            setSelectedImage(file);
        }
    };

    const handleImageUpload = () => {
        // TODO: Implement the image upload logic here

    };
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
                onChange={handleImageChange}
                className={styles.input}
                id="profileImage"
            />
    
            <label htmlFor="profileImage" className={styles.uploadButton}>
                Upload Image
            </label>
            {selectedImage && (
                <button className={styles.uploadButton} onClick={handleImageUpload}>
                    Confirm Upload
                </button>
            )}
        </div>
    );
    
}

export default ProfileImageUpload;



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
          
        </div>
    );
    
}

export default ProfileImageUpload;



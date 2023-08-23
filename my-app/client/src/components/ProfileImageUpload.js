import React, { useState } from 'react';
import styles from '../css/ProfileImageUpload.module.css'; 

function ProfileImageUpload() {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(file);
            setBackgroundImageUrl(imageUrl);
        }
    };

    const handleImageUpload = () => {
        // TODO: Implement the image upload logic here
        if (selectedImage) {
            console.log('Uploading image:', selectedImage);
            // You can send the selectedImage to the server for uploading
        }
    };

    return (
        <div className={styles.profileImageUpload}>
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            ></div>
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


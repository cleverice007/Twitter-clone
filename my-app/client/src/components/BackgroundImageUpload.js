import React, { useState } from 'react';
import styles from '../css/BackgroundImageUpload.module.css';

function BackgroundImageUpload() {
        const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
        const [selectedImage, setSelectedImage] = useState(null);
    
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setBackgroundImageUrl(imageUrl);
                setSelectedImage(file);
            }
        };
    
        return (
            <div className={styles.profileImageUpload}>
                {backgroundImageUrl && (
                    <img
                        src={backgroundImageUrl}
                        alt="Profile"
                        className={styles.backgroundImage}
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.input}
                    id="backgroundImage"
                />
        
                <label htmlFor="backgroundImage" className={styles.uploadButton}>
                    Upload Image
                </label>
               
            </div>
        );
        
    }
    
    export default BackgroundImageUpload;
    
    
    

import React, { useState } from 'react';
import styles from '../css/BackgroundImageUpload.module.css';

function BackgroundImageUpload(props) {
    const { onImageChange, backgroundImageUrl } = props;
    
  
    return (
        <div className={styles.profileImageUpload}>
            {backgroundImageUrl ? ( 
                <img
                    src={backgroundImageUrl}
                    alt="Profile"
                    className={styles.backgroundImage}
                />
            ) : null}
            <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
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
    
    
    

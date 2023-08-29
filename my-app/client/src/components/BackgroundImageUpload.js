import React, { useState } from 'react';
import styles from '../css/BackgroundImageUpload.module.css';

function BackgroundImageUpload(props) {
    const { onImageChange, backgroundImageURL } = props;


    return (
        <div className={styles.backgroundImageUpload}>
            {backgroundImageURL ? (
                <img src={backgroundImageURL} alt="Profile" className={styles.backgroundImage} />
            ) : null}
            <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className={styles.backgroundInput}
                id="backgroundImage"
            />
            <label htmlFor="backgroundImage" className={styles.uploadButton}>
                Upload Image
            </label>
        </div>
    );

}

export default BackgroundImageUpload;




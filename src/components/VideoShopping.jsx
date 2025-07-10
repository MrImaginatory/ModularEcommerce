import React from 'react';
import '../styles/VideoShopping.css';

const VideoShopping = () => {
    return (
        <div className="video-shopping-container">
            <div className="video-shopping-content">
                <h3 className="video-shopping-title">The Ultimate In Store Experience Via 24x7 Video Shopping</h3>
                <p className="video-shopping-subtitle">Our Stylists On Call Can Speak: English, Hindi, Gujarati & Marathi</p>
                <div className="video-shopping-input-group">
                    <input type="tel" className="video-shopping-input" placeholder="Phone +91" defaultValue="+91" />
                </div>
                <button className="video-shopping-button">START CALL NOW</button>
            </div>
        </div>
    );
};

export default VideoShopping;
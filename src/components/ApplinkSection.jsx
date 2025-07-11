import React from 'react';
import '../styles/AppLinkSection.css';

const AppLinkSection = () => {
    return (
        <div className="app-exclusives-section">
            {/* Image Container (Placeholder) */}
            <div className="app-image-container">
                <div className="app-image-placeholder">
                    <img src="https://placehold.co/256x384/E0E0E0/888888?text=App+Screenshot" alt="App Screenshot Placeholder" />
                </div>
            </div>

            {/* Content and Buttons */}
            <div className="app-content-buttons-wrapper">
                <h2>APP-FIRST EXCLUSIVES</h2>
                <p>
                    Get early access to the season's freshest suits, sarees, menswear, and more <br/>only on our app!
                </p>
                <div className="app-buttons">
                    <a href="https://play.google.com/store" target="_blank" className="app-button">
                        <img src="/staticAssets/PlayStore.svg" alt="Google Play" />
                    </a>
                    <a href="https://www.apple.com/app-store/" target="_blank" className="app-button">
                        <img src="/staticAssets/AppStore.svg" alt="App Store" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AppLinkSection;

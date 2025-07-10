import React from 'react';
import '../styles/FeatureSection.css';

const FeatureSection = () => {
    return (
        <div className="feature-icons-section">
            {/* Feature 1: 24-hour Dispatch */}
            <div className="feature-item">
                <img src="/staticAssets/24HourDispatch.svg" alt="24-hour Dispatch" />
                <p>24-hour Dispatch</p>
            </div>

            {/* Feature 2: Easy Returns */}
            <div className="feature-item">
                <img src="/staticAssets/EasyReturn.svg" alt="Easy Returns" />
                <p>Easy Returns</p>
            </div>

            {/* Feature 3: Instant In-Store Experience */}
            <div className="feature-item">
                <img src="/staticAssets/InStoreExperience.svg" alt="Instant In-Store Experience" />
                <p>Instant In-Store Experience</p>
            </div>

            {/* Feature 4: Custom Fitting */}
            <div className="feature-item">
                <img src="/staticAssets/CustomFitting.svg" alt="Custom Fitting" />
                <p>Custom Fitting</p>
            </div>
        </div>
    );
};

export default FeatureSection;

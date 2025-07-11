import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/'); // Using react-router's navigate instead of window.location
    };

    return (
        <>
            <div className="container">
                <h1>404</h1>
                <p className="subtitle">Oops! Page Not Found</p>
                <p className="description">
                    It looks like the page you're looking for doesn't exist or has been moved.
                    Don't worry, we'll help you get back on track!
                </p>
                <button className="home-button" onClick={handleGoHome}>
                    Go to Homepage
                </button>
            </div>
        </>
    );
}

export default NotFound;
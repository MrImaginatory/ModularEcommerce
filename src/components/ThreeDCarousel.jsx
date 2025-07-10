import React, { useState, useEffect, useRef } from 'react';
import '../styles/ThreeDCarousel.css';

const ThreeDCarousel = () => {
    const [videoData, setVideoData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselTrackRef = useRef(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch('/Jsons/3dcarousel.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setVideoData(data);
            } catch (error) {
                console.error('Could not fetch 3dcarousel.json, using simulated data:', error);
                const simulatedJson = [
                    { "src": "https://www.w3schools.com/html/mov_bbb.mp4", "type": "video/mp4", "alt": "Big Buck Bunny 1", "title": "Big Buck Bunny Adventure" },
                    { "src": "https://www.w3schools.com/html/movie.mp4", "type": "video/mp4", "alt": "The Movie", "title": "The Classic Movie" },
                    { "src": "https://www.w3schools.com/html/mov_bbb.mp4", "type": "video/mp4", "alt": "Big Buck Bunny 2", "title": "Big Buck Bunny Returns" },
                    { "src": "https://www.w3schools.com/html/movie.mp4", "type": "video/mp4", "alt": "The Movie 2", "title": "Movie Sequel" },
                    { "src": "https://www.w3schools.com/html/mov_bbb.mp4", "type": "video/mp4", "alt": "Big Buck Bunny 3", "title": "Big Buck Bunny Finale" }
                ];
                setVideoData(simulatedJson);
            }
        };

        fetchVideoData();
    }, []);

    useEffect(() => {
        if (videoData.length > 0) {
            updateCarousel();
        }
    }, [currentIndex, videoData]);

    const updateCarousel = () => {
        const items = Array.from(carouselTrackRef.current.children);
        const totalItems = items.length;

        items.forEach((item, index) => {
            const videoElement = item.querySelector('video');
            const controlsDiv = item.querySelector('.threeD-video-controls');

            item.classList.remove('threeD-center', 'threeD-left-1', 'threeD-left-2', 'threeD-right-1', 'threeD-right-2', 'threeD-hidden-left', 'threeD-hidden-right');

            const relativeIndex = (index - currentIndex + totalItems) % totalItems;

            if (relativeIndex === 0) {
                item.classList.add('threeD-center');
                if (videoElement) {
                    videoElement.play();
                }
                if (controlsDiv) {
                    controlsDiv.style.opacity = '1';
                    controlsDiv.style.pointerEvents = 'auto';
                }
            } else {
                if (relativeIndex === 1) {
                    item.classList.add('threeD-right-1');
                } else if (relativeIndex === 2) {
                    item.classList.add('threeD-right-2');
                } else if (relativeIndex === totalItems - 1) {
                    item.classList.add('threeD-left-1');
                } else if (relativeIndex === totalItems - 2) {
                    item.classList.add('threeD-left-2');
                } else if (relativeIndex < totalItems / 2) {
                    item.classList.add('threeD-hidden-right');
                } else {
                    item.classList.add('threeD-hidden-left');
                }

                if (videoElement) {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
                if (controlsDiv) {
                    controlsDiv.style.opacity = '0';
                    controlsDiv.style.pointerEvents = 'none';
                }
            }
        });
    };

    const showPrevVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + videoData.length) % videoData.length);
    };

    const showNextVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videoData.length);
    };

    const handleMuteToggle = (e) => {
        const videoElement = e.currentTarget.closest('.threeD-carousel-item').querySelector('video');
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            e.currentTarget.innerHTML = videoElement.muted ? '<span class="material-symbols-outlined">volume_off</span>' : '<span class="material-symbols-outlined">volume_up</span>';
        }
    };

    return (
        <div className="threeD-carousel-container">
            <div className="threeD-carousel-track" ref={carouselTrackRef}>
                {videoData.map((video, index) => (
                    <div className="threeD-carousel-item" key={index} data-index={index}>
                        <video src={video.src} type={video.type} alt={video.alt} autoPlay loop muted playsInline onError={(e) => {
                            console.error(`Error loading video: ${video.src}`);
                            const errorDiv = document.createElement('div');
                            errorDiv.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-full', 'bg-gray-200', 'text-gray-600', 'text-center', 'p-4', 'rounded-xl');
                            errorDiv.innerHTML = `
                                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 10a9 9 0 0118 0z"></path></svg>
                                <p>Video failed to load.</p>
                                <p className="text-sm break-all">${video.src}</p>
                            `;
                            e.currentTarget.parentNode.innerHTML = ''; // Clear the video element
                            e.currentTarget.parentNode.appendChild(errorDiv);
                        }}></video>
                        <div className="threeD-video-controls">
                            <div className="threeD-video-title">{video.title || 'Untitled Video'}</div>
                            <button className="threeD-video-button threeD-mute-button" onClick={handleMuteToggle}>
                                <span className="material-symbols-outlined">volume_off</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="threeD-carousel-button threeD-prev" onClick={showPrevVideo}>&#10094;</button>
            <button className="threeD-carousel-button threeD-next" onClick={showNextVideo}>&#10095;</button>
        </div>
    );
};

export default ThreeDCarousel;

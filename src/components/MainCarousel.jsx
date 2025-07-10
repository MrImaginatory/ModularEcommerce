import React, { useState, useEffect, useRef } from 'react';
import '../styles/MainCarousel.css';
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi';

const MainCarousel = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const carouselTrackRef = useRef(null);
    const carouselContainerRef = useRef(null);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const response = await fetch('/Jsons/carousel.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCarouselData(data);
            } catch (error) {
                console.error('Error fetching carousel data:', error);
                setCarouselData([{
                    image: "https://placehold.co/1200x500/CCCCCC/000000?text=Error+Loading+Image",
                    link: "#"
                }]);
            }
        };

        fetchCarouselData();
    }, []);

    useEffect(() => {
        if (carouselData.length > 0 && carouselTrackRef.current) {
            renderCarousel();
        }
    }, [carouselData]);

    useEffect(() => {
        updateCarouselPosition();
    }, [currentIndex]);

    const renderCarousel = () => {
        const track = carouselTrackRef.current;
        if (!track) return;

        track.innerHTML = '';

        if (carouselData.length === 0) {
            track.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 1rem;">No carousel items to display.</p>';
            return;
        }

        const lastItemClone = createCarouselItem(carouselData[carouselData.length - 1]);
        const firstItemClone = createCarouselItem(carouselData[0]);

        track.appendChild(lastItemClone);
        carouselData.forEach(item => {
            track.appendChild(createCarouselItem(item));
        });
        track.appendChild(firstItemClone);

        track.style.transition = 'none';
        updateCarouselPosition();
        void track.offsetWidth;
        track.style.transition = 'transform 0.5s ease-in-out';
    };

    const createCarouselItem = (itemData) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('mainCarousel-item');

        const link = document.createElement('a');
        link.href = itemData.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const img = document.createElement('img');
        img.src = itemData.image;
        img.alt = "Carousel Image";
        img.onerror = () => {
            img.src = "https://placehold.co/1600x500/CCCCCC/000000?text=Image+Not+Found";
            console.warn(`Failed to load image: ${itemData.image}`);
        };

        link.appendChild(img);
        carouselItem.appendChild(link);
        return carouselItem;
    };

    const updateCarouselPosition = () => {
        const track = carouselTrackRef.current;
        if (!track) return;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    };

    const handleTransitionEnd = () => {
        const track = carouselTrackRef.current;
        if (!track) return;

        if (currentIndex === carouselData.length + 1) {
            track.style.transition = 'none';
            setCurrentIndex(1);
            void track.offsetWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
        } else if (currentIndex === 0) {
            track.style.transition = 'none';
            setCurrentIndex(carouselData.length);
            void track.offsetWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
        }
    };

    const showNextImage = () => {
        if (carouselData.length === 0) return;
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const showPrevImage = () => {
        if (carouselData.length === 0) return;
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    return (
        <div id="mainCarousel-container" ref={carouselContainerRef}>
            <div id="mainCarousel-track" ref={carouselTrackRef} onTransitionEnd={handleTransitionEnd}>
                {/* Items will be dynamically added by renderCarousel */}
            </div>

            <button id="prev-btn" onClick={showPrevImage}>
                <FiChevronLeft size={24} />
            </button>
            <button id="next-btn" onClick={showNextImage}>
                <FiChevronRight size={24} />
            </button>
        </div>
    );
};

export default MainCarousel;
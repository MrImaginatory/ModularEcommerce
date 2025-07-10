import React, { useState, useEffect } from 'react';
import CustomerStoryCard from '../components/CustomerStoryCard';
import '../styles/CustomerStoryCarousel.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CustomerStoryCarousel = ({ apiUrl }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Fetch data from JSON file
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch customer stories');
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [apiUrl]);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop) {
        setCurrentSlide(0); // Reset to first slide when switching to mobile
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesToShow = isDesktop ? 2 : 1;
  const totalSlides = Math.ceil(stories.length / slidesToShow);

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  if (loading) {
    return <div className="cs-loading-message">Loading customer stories...</div>;
  }

  if (error) {
    return <div className="cs-error-message">Error: {error}</div>;
  }

  if (stories.length === 0) {
    return <div className="cs-no-stories-message">No customer stories available.</div>;
  }

  // Calculate which stories to show in current slide
  const startIdx = currentSlide * slidesToShow;
  const endIdx = startIdx + slidesToShow;
  const visibleStories = stories.slice(startIdx, endIdx);

  return (
    <div className="cs-customer-stories-carousel">
      <button className="cs-carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
        <FiChevronLeft size={24} />
      </button>
      
      <div className="cs-carousel-container">
        <div className="cs-carousel-inner">
          {visibleStories.map((story) => (
            <div key={story.id} className="cs-carousel-item">
              <CustomerStoryCard
                imageUrl={story.imageUrl}
                userName={story.userName}
                userCity={story.userCity}
                userMessage={story.userMessage}
                productLink={story.productLink}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="cs-carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default CustomerStoryCarousel;
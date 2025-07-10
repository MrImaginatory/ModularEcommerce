import React, { useState, useEffect } from 'react';
import DispatchCard from './DispatchCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/DispatchCarousel.css';

const DispatchCarousel = ({ title }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Jsons/curatedCollections.json'); // Path to your JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerSlide(4);
      } else if (window.innerWidth >= 768) {
        setCardsPerSlide(3);
      } else {
        setCardsPerSlide(2);
      }
      // Reset to first slide when cards per slide changes
      setCurrentSlide(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(cards.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const visibleCards = cards.slice(
    currentSlide * cardsPerSlide,
    (currentSlide + 1) * cardsPerSlide
  );

  if (loading) {
    return <div className="DSC-carousel-wrapper">Loading...</div>;
  }

  if (error) {
    return <div className="DSC-carousel-wrapper">Error: {error}</div>;
  }

  if (cards.length === 0) {
    return <div className="DSC-carousel-wrapper">No cards available</div>;
  }

  return (
    <div className="DSC-carousel-wrapper">
      <h2 className="DSC-carousel-title">{title}</h2>
      <div className="DSC-carousel">
        <button 
          className="DSC-carousel-btn DSC-prev" 
          onClick={prevSlide}
          disabled={cards.length <= cardsPerSlide}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <div className="DSC-carousel-container">
          {visibleCards.map((card, index) => (
            <div 
              key={`${card.title}-${index}`} 
              className="DSC-carousel-item"
              style={{ width: `calc(100% / ${cardsPerSlide})` }}
            >
              <DispatchCard {...card} />
            </div>
          ))}
        </div>

        <button 
          className="DSC-carousel-btn DSC-next" 
          onClick={nextSlide}
          disabled={cards.length <= cardsPerSlide}
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default DispatchCarousel;
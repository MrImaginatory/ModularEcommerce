import React from 'react';
import '../styles/DispatchCard.css';

const DispatchCard = ({ 
  title = "Default Title", 
  buttonText = "Learn More", 
  imageUrl = "https://placehold.co/400x500/000000/FFFFFF?text=Placeholder", 
  cardUrl = "#" 
}) => {
  return (
    <div className="DSC-card">
      <div className="DSC-image-container">
        <img
          className="DSC-image"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x500/CCCCCC/000000?text=Image+Not+Found";
          }}
        />
        <div className="DSC-overlay">
          <h2 className="DSC-title">{title}</h2>
          <a
            href={cardUrl}
            className="DSC-button"
            aria-label={`Go to ${title}`}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DispatchCard;
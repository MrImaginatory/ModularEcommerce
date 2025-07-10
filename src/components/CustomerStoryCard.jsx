import React from "react";
import '../styles/CustomerStoryCard.css'
const CustomerStoryCard = ({ imageUrl, userName, userCity, userMessage, productLink }) => {
  return (
<div className="customer-card-container">
        <div className="customer-card">
          <div className="image-section">
            <img
              src={imageUrl}
              alt={userName}
              className="customer-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/E0E0E0/333333?text=Image+Not+Found"; }}
            />
            <div className="product-button-container">
              <a
                href={productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-button"
              >
                VIEW PRODUCT
              </a>
            </div>
          </div>

          {/* Right section: User message and details */}
          <div className="message-section">
            <p className="user-message">
              "{userMessage}"
            </p>
            <div className="user-name">
              {userName}
            </div>
            <div className="user-city">
              {userCity}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CustomerStoryCard;

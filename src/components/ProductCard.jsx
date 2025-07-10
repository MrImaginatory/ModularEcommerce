import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';
const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const ProductCard = ({ 
  productId,
  imageUrl,
  hoverImageUrl,
  title,
  price,
  originalPrice,
  linkUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${linkUrl || productId}`);
  };

  // Function to construct the correct image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads')) {
      return `${BASE_URL}${url}`;
    }
    return url;
  };

  return (
    <div 
      className="product-card"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img
          src={getImageUrl(isHovered ? hoverImageUrl : imageUrl)}
          alt={title}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="price-container">
          <span className="current-price">{price}</span>
          {originalPrice && (
            <span className="original-price">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/CollectionPage.css';

const CollectionPage = () => {
  const { dynamicCollectionName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://mvcgroup.in/api/public/collections/${dynamicCollectionName}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error('Failed to fetch collection data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionProducts();
  }, [dynamicCollectionName]);

  const handleImageClick = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading-message">Loading collection...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="no-products-container">
        <img 
          src="/staticAssets/ProductNotFound.gif" 
          alt="No products found" 
          className="not-found-image"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <p className="no-products-message">No products found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <h1 className="collection-title">
        {dynamicCollectionName.replace(/-/g, ' ').toUpperCase()}
      </h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            productId={product.productId}
            imageUrl={product.imageUrl}
            hoverImageUrl={product.hoverImageUrl}
            title={product.title}
            price={product.price}
            originalPrice={product.originalPrice}
            linkUrl={product.linkUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
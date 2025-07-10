import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/ProductCarousel.css';

const ProductCarousel = ({ title = "Featured Products", apiUrl }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        if (data.success) setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setProductsPerSlide(5);
      } else if (window.innerWidth >= 768) {
        setProductsPerSlide(3);
      } else {
        setProductsPerSlide(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const visibleProducts = products.slice(
    currentSlide * productsPerSlide,
    (currentSlide + 1) * productsPerSlide
  );

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-carousel-wrapper">
      <h2 className="carousel-title">{title}</h2>
      <div className="product-carousel">
        <button className="carousel-btn prev" onClick={prevSlide}>
          <FiChevronLeft size={24} />
        </button>
        
        <div className="carousel-container">
          {visibleProducts.map((product) => (
            <div 
              key={product.productId} 
              className="carousel-item"
              style={{ width: `calc(100% / ${productsPerSlide})` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mvcgroup.in/api/public/products/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-grid">
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
  );
};

export default ProductGrid;
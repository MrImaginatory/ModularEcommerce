import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetails.css';
import { IoMdCloseCircle } from "react-icons/io";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M'); // Default to M
    const [mainImage, setMainImage] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

    const tabContents = [
        {
            title: "Product Details",
            content: product?.description || "No product details available."
        },
        {
            title: "Style & Fit Tips",
            content: staticData?.tabs[1]?.content || "Style tips not available."
        },
        {
            title: "Shipping & Returns",
            content: staticData?.tabs[2]?.content || "Shipping information not available."
        },
        {
            title: "FAQ",
            content: staticData?.tabs[3]?.content || "Frequently asked questions not available."
        }
    ];

    // Fixed size presets
    const sizePresets = ['S', 'M', 'L', 'XL'];

    const generateOrderData = () => {
        return {
            ProductId: product.productId,
            ProductName: product.title,
            ProductCategory: product.categories[0]?.categoryName || 'Uncategorized',
            ProductSize: selectedSize,
            ProductSubCategory: product.categories[1]?.categoryName || 'N/A',
            ProductType: product.type || 'Standard',
            PurchasedAt: new Date().toISOString(),
            OrderId: `${product.title.replace(/\s+/g, '-')}-${Date.now()}`,
            ProductColor: colorOptions.length > 0 ? colorOptions[0] : 'Default',
            Price: product.price === "$NaN" ? "$500.00" : product.price,
            ImageUrl: mainImage,
            Discount: product.discount || '0%',
            ShippingAddress: 'To be added',
            PaymentMethod: 'To be selected'
        };
    };

    const handleBuyNow = () => {
        const orderData = generateOrderData();
        console.log('Order Details:', orderData);
        alert(`Order placed for ${product.title}! Check console for details.`);

        // In a real app, you would likely:
        // 1. Redirect to checkout page with this data
        // 2. Or send to your backend API
        // 3. Or open a payment modal
    };

    useEffect(() => {
        // Fetch product data
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://mvcgroup.in/api/public/products/${productId}`
                );

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                    setMainImage(data.data.imageUrl);
                } else {
                    throw new Error('Failed to fetch product data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch static data
        const fetchStaticData = async () => {
            try {
                const response = await fetch('/Jsons/productStaticData.json');
                const data = await response.json();
                setStaticData(data);
            } catch (err) {
                console.error('Error loading static data:', err);
            }
        };

        fetchProduct();
        fetchStaticData();
    }, [productId]);

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads')) {
            return `${BASE_URL}${url}`;
        }
        return url;
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleImageClick = (e) => {
        // Single click - zoom in container
        if (e.detail === 1) {
            toggleZoom();
        }
        // Double click - show overlay
        else if (e.detail === 2) {
            setShowOverlay(true);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        setShowOverlay(true);
    };

    const toggleZoom = () => {
        if (isZoomed) {
            setZoomLevel(1);
            setIsZoomed(false);
        } else {
            setZoomLevel(2);
            setIsZoomed(true);
        }
    };

    const handleMouseMove = (e) => {
        if (!isZoomed || !imageRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const img = imageRef.current;

        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    };

    const handleMouseLeave = () => {
        if (isZoomed) {
            setZoomLevel(1);
            setIsZoomed(false);
        }
    };

    // Get unique images (filter duplicates)
    const getUniqueImages = () => {
        if (!product) return [];

        const images = [];
        const seenFiles = new Set();

        // Add main image if not duplicate
        const mainImageFile = product.imageUrl.split('/').pop();
        if (!seenFiles.has(mainImageFile)) {
            images.push({ url: product.imageUrl, type: 'main' });
            seenFiles.add(mainImageFile);
        }

        // Add hover image if not duplicate
        if (product.hoverImageUrl) {
            const hoverImageFile = product.hoverImageUrl.split('/').pop();
            if (!seenFiles.has(hoverImageFile)) {
                images.push({ url: product.hoverImageUrl, type: 'hover' });
                seenFiles.add(hoverImageFile);
            }
        }

        // Add sub images if not duplicates
        product.subImages.forEach(imageUrl => {
            const fileName = imageUrl.split('/').pop();
            if (!seenFiles.has(fileName)) {
                images.push({ url: imageUrl, type: 'sub' });
                seenFiles.add(fileName);
            }
        });

        return images;
    };

    // Get available sizes from variants
    const getAvailableSizes = () => {
        if (!product) return [];

        const availableSizes = [...new Set(product.variants.map(v =>
            v.options.find(o => o.attribute === 'Size')?.value
        ))].filter(Boolean);

        // If no sizes available, return just 'M' as available
        if (availableSizes.length === 0) return ['M'];

        // Filter to only include our presets plus any additional from backend
        const allSizes = [...new Set([...sizePresets, ...availableSizes])];
        return allSizes;
    };

    // Get color options from variants
    // Get color options from variants - updated to remove duplicates and show names only
    const getColorOptions = () => {
        if (!product) return [];

        // Create a map to ensure unique colors
        const colorMap = new Map();

        product.variants.forEach(v => {
            const colorOption = v.options.find(o => o.attribute === 'Color');
            if (colorOption) {
                // Use color name as key to ensure uniqueness
                colorMap.set(colorOption.value, colorOption.value);
            }
        });

        // Convert map values to array
        return Array.from(colorMap.values());
    };

    // Helper to get hex color from color name
    const getColorHex = (colorName) => {
        const colorMap = {
            'Red': '#FF0000',
            'Blue': '#0000FF',
            'Green': '#00FF00',
            'Black': '#000000',
            'White': '#FFFFFF',
            // Add more color mappings as needed
        };
        return colorMap[colorName] || '#CCCCCC'; // Default to gray if not found
    };

    if (loading) {
        return <div className="loading">Loading product details...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!product || !staticData) {
        return <div className="not-found">Product not found</div>;
    }

    const uniqueImages = getUniqueImages();
    const availableSizes = getAvailableSizes();
    const colorOptions = getColorOptions();

    return (
        <div className="product-details-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                Home / {product.categories[0]?.categoryName} / {product.title}
            </div>

            {/* Product Header */}
            <div className="product-header">
                <h1>{product.title}</h1>
                <p className="style-number">Style No {product.productId.substring(0, 8).toUpperCase()}</p>
            </div>

            {/* Promo Banner */}
            {/* {staticData.promoBanner && (
        <div className="promo-banner">
          <p>{staticData.promoBanner.title}</p>
          <p>{staticData.promoBanner.subtitle}</p>
          <p>{staticData.promoBanner.offer}</p>
        </div>
      )} */}

            {/* Product Main Content */}
            <div className="product-main">
                {/* Image Gallery */}
                <div className="image-gallery">
                    <div
                        className="main-image-container"
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleImageClick}
                        onContextMenu={handleRightClick}
                    >
                        <img
                            ref={imageRef}
                            src={getImageUrl(mainImage)}
                            alt={product.title}
                            style={{ transform: `scale(${zoomLevel})` }}
                            className={isZoomed ? 'zoomed' : ''}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>
                    <div className="thumbnail-container">
                        {uniqueImages.map((image, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${mainImage === image.url ? 'active' : ''}`}
                                onClick={() => setMainImage(image.url)}
                            >
                                <img
                                    src={getImageUrl(image.url)}
                                    alt={`Product ${image.type} view`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>

                    {/* Price */}
                    <div className="price-section">
                        <span className="current-price">₹{product.price === "$NaN" ? "$500.00" : product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice}</span>
                        )}
                        {product.discount && (
                            <span className="discount-badge">₹{product.discount}</span>
                        )}
                    </div>

                    {/* Size Selection */}
                    <div className="size-section">
                        <h3>Size:</h3>
                        <div className="size-options">
                            {sizePresets.map((size) => (
                                <button
                                    key={size}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''
                                        } ${!availableSizes.includes(size) ? 'disabled' : ''
                                        }`}
                                    onClick={() => availableSizes.includes(size) && handleSizeSelect(size)}
                                    disabled={!availableSizes.includes(size)}
                                >
                                    {size}
                                </button>
                            ))}
                            {/* Additional sizes from backend */}
                            {availableSizes.filter(size => !sizePresets.includes(size)).map(size => (
                                <button
                                    key={size}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''
                                        }`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {availableSizes.length === 1 && availableSizes[0] === 'M' && (
                            <p className="size-notice">Only size M available</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="add-to-cart">
                            ADD TO CART • {product.price === "$NaN" ? "$500.00" : product.price}
                        </button>
                        <button className="buy-now" onClick={handleBuyNow}>
                            BUY IT NOW
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className="social-proof">
                        <p>{staticData.socialProof}</p>
                    </div>

                    {/* Delivery Estimate */}
                    <div className="delivery-estimate">
                        <p>{staticData.deliveryEstimate}</p>
                    </div>

                    {/* Color Options */}
                    <div className="color-options">
                        <h3>More Colors</h3>
                        {colorOptions.length > 0 ? (
                            <div className="color-names">
                                {colorOptions.map((color, index) => (
                                    <span
                                        key={index}
                                        className="color-name"
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="no-colors">No more colors available</p>
                        )}
                    </div>
                    {/* Benefits */}
                    <div className="benefits">
                        {staticData.benefits.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Tabs - Loaded from JSON */}
            <div className="product-tabs">
                {staticData.tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                <h3>{tabContents[activeTab].title}</h3>
                <p>{tabContents[activeTab].content}</p>
            </div>

            {/* Image Overlay */}
            {showOverlay && (
                <div className="image-overlay" onClick={() => setShowOverlay(false)}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-overlay"
                            onClick={() => setShowOverlay(false)}
                        >
                            <IoMdCloseCircle size={25} />
                        </button>
                        <img
                            src={getImageUrl(mainImage)}
                            alt={product.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/Jsons/Footer.json');
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error('Error loading footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) return <div>Loading footer...</div>;
  if (!footerData) return <div>Error loading footer data</div>;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-columns">
          {footerData.sections.map((section, index) => (
            <div key={index} className="footer-column">
              <h3 className="footer-title">{section.title}</h3>
              
              {/* Render images if they exist */}
              {section.images ? (
                <div className="payment-methods">
                  {section.images.map((image, imgIndex) => (
                    <img 
                      key={imgIndex}
                      src={image}
                      alt={`Payment method ${imgIndex + 1}`}
                      className="payment-icon"
                    />
                  ))}
                </div>
              ) : (
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-middle">
        <div className="collection-links">
          {footerData.sections[5].links.map((link, index) => (
            <a key={index} href="#">{link}</a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="services">
          {footerData.services.map((service, index) => (
            <span key={index} className="service-item">{service}</span>
          ))}
        </div>
        <div className="shipping-info">{footerData.shippingInfo}</div>
        <div className="copyright">{footerData.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
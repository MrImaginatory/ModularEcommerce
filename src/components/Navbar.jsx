import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Submenu from './Submenu';
import '../styles/Navbar.css'
import { BsPersonCircle,BsWhatsapp ,BsCameraVideo ,BsBag ,BsSuitHeart  } from "react-icons/bs";

const Navbar = () => {
    const [mainNavLinks, setMainNavLinks] = useState([]);
    const [secondaryNavLinks, setSecondaryNavLinks] = useState([]);
    const [mobileMainNavLinks, setMobileMainNavLinks] = useState([]);
    const [mobileSecondaryNavLinks, setMobileSecondaryNavLinks] = useState([]);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isSubmenuEnabled, setIsSubmenuEnabled] = useState(false); // State to enable/disable submenu

    // Submenu related states
    const [submenuData, setSubmenuData] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });
    const submenuHideTimeoutRef = useRef(null);
    const navbarTwoRef = useRef(null);

    useEffect(() => {
        // Fetch navigation data
        fetch('/Jsons/navbar.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMainNavLinks(data.mainNavLinks);
                setMobileMainNavLinks(data.mainNavLinks);
            })
            .catch(error => console.error('Error fetching navigation data:', error));

        // Fetch submenu data
        fetch('/Jsons/submenu.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setSubmenuData(data);
            })
            .catch(error => console.error('Error fetching submenu data:', error));

        // Fetch secondary navigation links from the new URL
        fetch('https://mvcgroup.in/api/public/collections')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setSecondaryNavLinks(data.secondaryNavLinks);
                setMobileSecondaryNavLinks(data.secondaryNavLinks);
            })
            .catch(error => console.error('Error fetching secondary navigation data:', error));
    }, []);

    const handleMouseEnter = (event, categoryName) => {
        if (!isSubmenuEnabled) return; // Do not show submenu if disabled

        clearTimeout(submenuHideTimeoutRef.current);
        setActiveCategory(categoryName);
        setShowDropdown(true);
        if (navbarTwoRef.current) {
            const navbarTwoRect = navbarTwoRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: navbarTwoRect.bottom + window.scrollY,
            });
        }
    };

    const handleMouseLeave = () => {
        submenuHideTimeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
            setActiveCategory(null);
        }, 300);
    };

    const handleDropdownMouseEnter = () => {
        clearTimeout(submenuHideTimeoutRef.current);
    };

    const handleDropdownMouseLeave = () => {
        submenuHideTimeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
            setActiveCategory(null);
        }, 300);
    };

    const handleMobileNavLinkClick = (event) => {
        const target = event.target;
        if (target.tagName === 'A') {
            const li = target.parentElement;
            let submenuContainer = li.querySelector('.submenu-mobile-container');
            if (!submenuContainer) {
                submenuContainer = document.createElement('div');
                submenuContainer.classList.add('submenu-mobile-container');
                li.appendChild(submenuContainer);
            }
            submenuContainer.style.display = submenuContainer.style.display === 'none' ? 'block' : 'none';
        }
    };

    return (
        <header className="header">
            <nav className="navbar">
                <button className="hamburger" aria-label="Open menu" onClick={() => setIsMobileNavOpen(true)}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <ul className="nav__categories" id="main-nav-links">
                    {mainNavLinks.map(link => (
                        <li key={link.name}>
                            <Link
                                to={link.url}
                                className="nav__category disabled-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav__logo">
                    <Link to='/'>KALKI</Link>
                </div>
                <div className="nav__search">
                    <input type="text" placeholder="Search for Gown" aria-label="Search" />
                    <button className="nav__search-btn" aria-label="Search"></button>
                </div>
                <div className="nav__icons">
                    <a href="#" className="nav__icon" aria-label="Video">
                        <span className='nav__icons__icons'><BsCameraVideo /></span>
                    </a>
                    <a href="#" className="nav__icon" aria-label="Call">
                        <span className='nav__icons__icons'><BsWhatsapp  /></span>
                    </a>
                    <a href="#" className="nav__icon" aria-label="User">
                        <span className='nav__icons__icons'><BsPersonCircle /></span>
                    </a>
                    <a href="#" className="nav__icon" aria-label="Wishlist" data-count="1">
                        <span className='nav__icons__icons'><BsSuitHeart /></span>
                    </a>
                    <a href="#" className="nav__icon" aria-label="Cart">
                        <span className='nav__icons__icons'><BsBag  /></span>
                    </a>
                </div>
            </nav>
            <nav className="navbar__two" ref={navbarTwoRef}>
                <ul className="nav__categories__two" id="dynamic-nav-links">
                    {secondaryNavLinks.map(link => (
                        <li
                            key={link.name}
                            className="nav__category__two"
                            onMouseEnter={(e) => handleMouseEnter(e, link.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to={link.url}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                {isSubmenuEnabled && showDropdown && activeCategory && submenuData && (
                    <div
                        className={`dropdown-menu ${showDropdown ? 'visible' : ''}`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                    >
                        <Submenu submenuData={submenuData} categoryName={activeCategory} />
                    </div>
                )}
            </nav>
            <div className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
                <button className="close-btn" aria-label="Close menu" onClick={() => setIsMobileNavOpen(false)}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <ul id="mobile-main-nav" style={{ display: 'flex', fontSize: 'small' }} onClick={handleMobileNavLinkClick}>
                    {mobileMainNavLinks.map(link => (
                        <li key={`mobile-main-${link.name}`}>
                            <Link to={link.url}>{link.name}</Link>
                            <div className="mobile-submenu-render-target"></div>
                        </li>
                    ))}
                </ul>
                <ul id="mobile-secondary-nav" style={{ margin: '0' }} onClick={handleMobileNavLinkClick}>
                    {mobileSecondaryNavLinks.map(link => (
                        <li key={`mobile-secondary-${link.name}`}>
                            <Link to={link.url}>{link.name}</Link>
                            <div className="mobile-submenu-render-target"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;

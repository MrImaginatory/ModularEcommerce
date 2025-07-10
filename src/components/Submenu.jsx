// Submenu.jsx
import React, { useState, useEffect } from 'react';

const Submenu = ({ submenuData, categoryName }) => {
    if (!submenuData || !submenuData.mainNavSubmenuMap || !submenuData.submenuCategories) {
        return null;
    }

    const submenuConfig = submenuData.mainNavSubmenuMap[categoryName];

    if (!submenuConfig) {
        console.warn(`No submenu configuration found for category: ${categoryName}`);
        return null;
    }

    // State to manage active submenu item within the dropdown
    const [activeSubmenuItem, setActiveSubmenuItem] = useState(submenuConfig.length > 0 ? submenuConfig[0] : null);

    useEffect(() => {
        // Set the first item as active by default when category changes
        if (submenuConfig.length > 0) {
            setActiveSubmenuItem(submenuConfig[0]);
        } else {
            setActiveSubmenuItem(null);
        }
    }, [categoryName, submenuConfig]); // Re-run when categoryName or submenuConfig changes

    return (
        <div className="submenu">
            <ul className="submenuItems">
                {submenuConfig.map(subCategoryName => {
                    const subCategoryData = submenuData.submenuCategories.find(cat => cat.name === subCategoryName);
                    if (subCategoryData) {
                        return (
                            <li
                                key={subCategoryData.id}
                                className={`submenuItemList ${activeSubmenuItem === subCategoryName ? 'active' : ''}`}
                                onMouseEnter={() => setActiveSubmenuItem(subCategoryName)}
                            >
                                {subCategoryData.name}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <div className="submenu-content-wrapper">
                {submenuConfig.map(subCategoryName => {
                    const subCategoryData = submenuData.submenuCategories.find(cat => cat.name === subCategoryName);
                    if (subCategoryData && activeSubmenuItem === subCategoryName) {
                        return (
                            <div key={subCategoryData.id} id={subCategoryData.id} className="submenuContentPanel active">
                                {subCategoryData.items.map(item => (
                                    <div key={item.name} className="subMenuItem">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/CCCCCC/000000?text=Image+Error'; }}
                                            />
                                        </a>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Submenu;
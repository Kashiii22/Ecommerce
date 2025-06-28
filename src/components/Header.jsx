import React, { useEffect, useRef } from 'react';
import './Header.css';
import { FaShoppingBag, FaSearch } from 'react-icons/fa';

const Header = () => {
  const placeholderRef = useRef(null);
  const phrases = [
    "Search dresses...",
    "Explore latest styles...",
    "Grab festive offers...",
    "Discover your look..."
  ];

  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let currentText = '';
    let typing = true;

    const interval = setInterval(() => {
      if (typing) {
        if (charIndex < phrases[index].length) {
          currentText += phrases[index][charIndex++];
          placeholderRef.current.textContent = currentText;
        } else {
          typing = false;
          setTimeout(() => {}, 1000); // small pause before deleting
        }
      } else {
        if (charIndex > 0) {
          currentText = currentText.slice(0, --charIndex);
          placeholderRef.current.textContent = currentText;
        } else {
          typing = true;
          index = (index + 1) % phrases.length;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="main-header">
      <div className="logo">SHOPIFY</div>

      <nav className="nav-links">
        <a href="#">HOME</a>
        <a href="#">SHOP</a>
        <a href="#">ABOUT</a>
        <a href="#">BLOG</a>
        <a href="#">CONTACT</a>
      </nav>

      {/* Search Bar with Icon */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" className="search-input" />
        <span className="search-placeholder" ref={placeholderRef}></span>
      </div>

      <div className="cart-icon" style={{ backgroundColor: '#a678ff', color: 'white' }}>
        <FaShoppingBag />
        <span className="cart-count">0</span>
      </div>
    </header>
  );
};

export default Header;

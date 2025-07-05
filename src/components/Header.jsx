import React, { useEffect, useRef } from 'react';
import './Header.css';
import { FaSearch, FaUser } from 'react-icons/fa'; // Replace bag with user icon
import { Link } from 'react-router-dom';

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
          setTimeout(() => {}, 1000);
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
      <Link to="/" className="logo">SHOPIFY</Link>

      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/product">SHOP</Link>
       <Link to="/cart">CART</Link>
        <a href="#">BLOG</a>
        <a href="#">CONTACT</a>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" className="search-input" />
        <span className="search-placeholder" ref={placeholderRef}></span>
      </div>

      {/* Profile Icon */}
      <Link to="/profile" className="profile-icon" style={{ backgroundColor: '#a678ff', color: 'white' }}>
        <FaUser />
      </Link>
    </header>
  );
};

export default Header;

import React from 'react';
import './ProductList.css';

const ProductFilter = ({
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  clearFilters,
  totalCount,
}) => {
  const categories = ['All', 'Shirts', 'Jackets', 'Dresses', 'Sets'];
  const brands = ['Zara', 'H&M', 'Nike', 'Adidas', 'Puma'];

  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">Filter Products</h3>

      {/* Category Dropdown */}
      <div className="filter-section">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Brand Dropdown */}
      <div className="filter-section">
        <label className="filter-label">Brand</label>
        <select
          className="filter-select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All</option>
          {brands.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Slider */}
      <div className="filter-section">
        <label className="filter-label">Price</label>
        <div className="slider-wrapper">
          <input
            className="price-slider"
            type="range"
            min="0"
            max="5000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
            }
          />
          <div className="slider-values">
            <span>₹0</span>
            <span>Up to ₹{priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="filter-actions">
        <button className="clear-btn" onClick={clearFilters}>
          Clear All
        </button>
        <span className="total-count">Showing {totalCount} products</span>
      </div>
    </div>
  );
};

export default ProductFilter;

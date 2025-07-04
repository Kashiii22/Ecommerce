import React, { useState, useEffect } from 'react';
import './ProductList.css';
import Header from './Header';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductFilter from './ProductFilter';
import { useNavigate } from 'react-router-dom';

const sampleProducts = [
  { id: 1, name: 'Classic White Shirt', price: 999, brand: 'Zara', category: 'Shirts', image: 'https://via.placeholder.com/220x300.png?text=White+Shirt' },
  { id: 2, name: 'Floral Summer Dress', price: 1499, brand: 'H&M', category: 'Dresses', image: 'https://via.placeholder.com/220x300.png?text=Summer+Dress' },
  { id: 3, name: 'Cartoon Tee', price: 799, brand: 'Nike', category: 'Shirts', image: 'https://via.placeholder.com/220x300.png?text=Cartoon+Tee' },
  { id: 4, name: 'Denim Jacket', price: 1999, brand: 'Adidas', category: 'Jackets', image: 'https://via.placeholder.com/220x300.png?text=Denim+Jacket' },
  { id: 5, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },
    { id: 6, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },

      { id: 7, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },

        { id: 8, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },
  { id: 9, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },
  { id: 10, name: 'Kurti Set', price: 1299, brand: 'Puma', category: 'Sets', image: 'https://via.placeholder.com/220x300.png?text=Kurti+Set' },

];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setProducts(sampleProducts);
    setFiltered(sampleProducts);
  }, []);

  useEffect(() => {
    const result = products.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchBrand = !brand || p.brand === brand;
      const matchPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      return matchCategory && matchBrand && matchPrice;
    });
    setFiltered(result);
  }, [category, brand, priceRange, products]);

  const clearFilters = () => {
    setCategory('All');
    setBrand('');
    setPriceRange({ min: 0, max: 5000 });
  };

  return (
    <>
      <Header />
      <div className="product-layout">
        <div className="filter-wrapper">
          <ProductFilter
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            clearFilters={clearFilters}
            totalCount={filtered.length}
          />
        </div>

        <div className="product-list-grid">
          <h2 className="browse-heading">Explore Our Products</h2>
          <div className="products-grid">
            {filtered.length > 0 ? (
              filtered.map((product, i) => (
                <div className="product-card" key={product.id} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.brand} | {product.category}</p>
                    <strong>₹{product.price}</strong>
                    <button className="view-btn" onClick={() => navigate(`/product/${product.id}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results" data-aos="fade-up">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import Header from './Header';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductFilter from './ProductFilter';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ritiksinha2727.pythonanywhere.com/');
      const data = res.data.products;

      const mappedProducts = data.map((item) => ({
        id: item.id,
        name: item.product?.prod_name || 'No Name',
        price: item.offer_price || 0,
        brand: item.tag || 'Unknown',
        category: 'Tshirts', // from res.data.categories[0]?.category_name
        color: item.color,
        image: `https://ritiksinha2727.pythonanywhere.com${item.product_images[0]?.image || ''}`,
      }));

      setProducts(mappedProducts);
      setFiltered(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const result = products.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchBrand = !brand || p.brand.toLowerCase() === brand.toLowerCase();
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

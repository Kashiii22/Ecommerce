import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './Header';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RecommendationCard = ({ product }) => (
  <div className="suggestion-card" data-aos="flip-up">
    <img src={product.image} alt={product.name} />
    <p>{product.name}</p>
    <p className="price">
      <span className="discounted-price">₹{product.discountedPrice.toFixed(2)}</span>
    </p>
  </div>
);
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ useNavigate inside component
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [recommendations] = useState([
    {
      id: 3,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      discountedPrice: 39.99,
    },
    {
      id: 4,
      name: 'Classic Shirt',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
      discountedPrice: 29.99,
    },
  ]);
  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios
      .get(`https://ritiksinha2727.pythonanywhere.com/product_detail/${id}/`)
      .then((res) => {
        const productData = res.data.product;
        setProduct(productData);
        setSelectedSize(productData.size_available[0]?.size_code || '');
        setSelectedColor(productData.color_code || '');
        setSelectedImage(
          `https://ritiksinha2727.pythonanywhere.com${productData.product_images[0]?.image || ''}`
        );
      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    axios
      .post('https://ritiksinha2727.pythonanywhere.com/order/add-to-cart/', {
        product_id: product.id,
        size: selectedSize,
        quantity: quantity,
      })
      .then(() => {
        toast.success('Added to cart successfully!');
        setTimeout(() => {
          navigate('/cart'); 
        }, 1500);
      })
      .catch((err) => {
        console.error('Add to cart failed:', err);
        toast.error('Failed to add to cart.');
      });
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <>
      <Header />
      <div className="product-details">
        <div className="details-container">
          {/* Left - Image Section */}
          <div className="left-column">
            <img src={selectedImage} alt="Selected" className="main-image" />
            <div className="thumbnails">
              {product.product_images.map((imgObj, i) => {
                const imageUrl = `https://ritiksinha2727.pythonanywhere.com${imgObj.image}`;
                return (
                  <img
                    key={i}
                    src={imageUrl}
                    alt="thumb"
                    onClick={() => setSelectedImage(imageUrl)}
                  />
                );
              })}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="right-column">
            <span className="category">{product.product.category}</span>
            <h2>{product.product.prod_name}</h2>

            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) =>
                i < 4 ? (
                  <FaStar key={i} />
                ) : i < 4.5 ? (
                  <FaStarHalfAlt key={i} />
                ) : (
                  <FaRegStar key={i} />
                )
              )}
              <span>(Based on Reviews)</span>
            </div>

            <div className="price">
              <span className="new">₹{product.offer_price}</span>
            </div>

            <p className="desc">{product.product.description}</p>

            <div className="color-picker">
              <strong>Color:</strong>
              <span
                style={{ backgroundColor: product.color_code }}
                className={`color-swatch ${selectedColor === product.color_code ? 'selected' : ''}`}
                onClick={() => setSelectedColor(product.color_code)}
              ></span>
            </div>

            <div className="sizes">
              <strong>Size:</strong>
              {product.size_available.map((s) => (
                <button
                  key={s.size_code}
                  className={selectedSize === s.size_code ? 'active' : ''}
                  onClick={() => setSelectedSize(s.size_code)}
                >
                  {s.size_code}
                </button>
              ))}
              <button className="size-chart-btn" onClick={() => setShowSizeChart(true)}>
                View Size Chart
              </button>
            </div>

            {showSizeChart && (
              <div className="size-chart-modal">
                <div className="size-chart-content" data-aos="zoom-in">
                  <span className="close-btn" onClick={() => setShowSizeChart(false)}>
                    &times;
                  </span>
                  <h3>Size Chart</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Bust (inches)</th>
                        <th>Waist (inches)</th>
                        <th>Hip (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>S</td><td>32</td><td>26</td><td>34</td></tr>
                      <tr><td>M</td><td>34</td><td>28</td><td>36</td></tr>
                      <tr><td>L</td><td>36</td><td>30</td><td>38</td></tr>
                      <tr><td>XL</td><td>38</td><td>32</td><td>40</td></tr>
                      <tr><td>XXL</td><td>40</td><td>34</td><td>42</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="stock">
              {product.out_of_stock ? (
                <span className="out-stock">Out of Stock</span>
              ) : (
                <span className="in-stock">In Stock</span>
              )}
            </div>

            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="buttons">
              <button className="add-cart" onClick={handleAddToCart}>Add To Cart</button>
              <button className="buy-now" onClick={handleAddToCart}>Buy Now</button>
            </div>

            <div className="meta">
              <p>Tags: {product.tag}</p>
              <p className="share">
                Share: <FaFacebookF /> <FaTwitter /> <FaPinterestP /> <FaLinkedinIn />
              </p>
            </div>
          </div>
        </div>
      </div>
         <section className="recommendations">
        <h3 data-aos="fade-up">You May Also Like</h3>
        <div className="product-suggestions">
          {recommendations.map((product) => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default ProductDetails;

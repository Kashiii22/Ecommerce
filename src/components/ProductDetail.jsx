import React, { useState, useEffect } from 'react';
import './ProductDetail.css';
import WebFont from 'webfontloader';
import { FaStar, FaStarHalfAlt, FaRegStar, FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './Header';
import Footer from './Footer';
import img1 from '../assets/img/gallery/s1i1.jpg';
import img2 from '../assets/img/gallery/s2i2.jpg';
import img3 from '../assets/img/gallery/s3i3.jpg';

const product = {
  title: 'Royal White',
  category: 'Suits',
  rating: 4.8,
  reviewCount: 245,
  price: 75.0,
  originalPrice: 150.0,
  colors: ['#5a3e36', '#0f0f0f', '#2c7a7b', '#008080'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  tags: ['Women', 'Fashion', 'Suits'],
  images: [img1, img2, img3],
  description: `This is a symbol of elegance, royalty and fashion in parallel.`,
};

const reviews = [
  {
    name: 'Ananya Mehta',
    rating: 5,
    comment: 'Absolutely loved the quality and fit!',
  },
  {
    name: 'Riya Sharma',
    rating: 4,
    comment: 'Looks stunning and fits perfectly. Would recommend!',
  },
  {
    name: 'Kritika Verma',
    rating: 5,
    comment: 'So elegant and comfortable. Got so many compliments!',
  },
];

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Playfair Display:600,700', 'Poppins:400,500,600'],
      },
    });
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header />
      <div className="product-details">
        <div className="details-container">
          <div className="left-column">
            <img src={selectedImage} alt="Selected" className="main-image" />
            <div className="thumbnails">
              {product.images.map((img, i) => (
                <img key={i} src={img} alt="thumb" onClick={() => setSelectedImage(img)} />
              ))}
            </div>
          </div>

          <div className="right-column">
            <span className="category">{product.category}</span>
            <h2>{product.title}</h2>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) =>
                i < Math.floor(product.rating) ? (
                  <FaStar key={i} />
                ) : i < product.rating ? (
                  <FaStarHalfAlt key={i} />
                ) : (
                  <FaRegStar key={i} />
                )
              )}
              <span>({product.reviewCount} Reviews)</span>
            </div>

            <div className="price">
              <span className="new">${product.price.toFixed(2)}</span>
              <span className="old">${product.originalPrice.toFixed(2)}</span>
            </div>

            <p className="desc">{product.description}</p>

            <div className="color-picker">
              <strong>Color:</strong>
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: color }}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                ></span>
              ))}
            </div>

            <div className="sizes">
              <strong>Size:</strong>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
              <button className="size-chart-btn" onClick={() => setShowSizeChart(true)}>
                View Size Chart
              </button>
            </div>

            {showSizeChart && (
              <div className="size-chart-modal">
                <div className="size-chart-content" data-aos="zoom-in">
                  <span className="close-btn" onClick={() => setShowSizeChart(false)}>&times;</span>
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
              {product.inStock ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-stock">Out of Stock</span>
              )}
            </div>

            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="buttons">
              <button className="add-cart">Add To Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>

            <div className="meta">
              <p>Tags: {product.tags.join(', ')}</p>
              <p className="share">
                Share: <FaFacebookF /> <FaTwitter /> <FaPinterestP /> <FaLinkedinIn />
              </p>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="review-section" data-aos="fade-up">
          <h3 className="review-heading">Customer Reviews</h3>
          <div className="review-cards">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
                <h4>{review.name}</h4>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < review.rating ? <FaStar key={i} color="#f1c40f" /> : <FaRegStar key={i} />
                  )}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Similar Products Section */}
<div className="similar-products-section" data-aos="fade-up">
  <h3 className="review-heading">Similar Products</h3>
  <div className="similar-products-grid">
    {[
      {
        title: 'I1',
        price: 68.0,
        img: img2,
      },
      {
        title: 'I2',
        price: 82.0,
        img: img3,
      },
      {
        title: 'I3',
        price: 70.0,
        img: img1,
      },
    ].map((item, idx) => (
      <div className="similar-card" key={idx} data-aos="fade-up" data-aos-delay={`${idx * 150}`}>
        <img src={item.img} alt={item.title} className="similar-img" />
        <h4 className="similar-title">{item.title}</h4>
        <p className="similar-price">${item.price.toFixed(2)}</p>
        <button className="view-btn">View</button>
      </div>
    ))}
  </div>
</div>

      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

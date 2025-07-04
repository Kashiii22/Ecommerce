import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://ritiksinha2727.pythonanywhere.com/')
      .then((response) => {
        setProducts(response.data.products);
        console.log('Fetched Products:', response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section className="new-arrivals">
      <h2 data-aos="fade-up" style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem' }}>
        New Arrivals
      </h2>

      <div className="arrivals-grid">
        {products.map((item, i) => {
          const product = item.product;
          const imageUrl = `https://ritiksinha2727.pythonanywhere.com${item.product_images[0]?.image || ''}`;

          return (
            <div
              className="arrival-card"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={`${i * 100}`}
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={imageUrl} alt={product.prod_name} />
              <div className="arrival-info" style={{ fontFamily: 'Poppins' }}>
                <h4>{product.prod_name}</h4>
                <p>₹{item.offer_price}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="browse-btn-container" data-aos="fade-up">
        <button className="browse-more-btn">Browse More</button>
      </div>
    </section>
  );
};

export default NewArrivals;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CartPage.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { FaTrash } from 'react-icons/fa';

const BASE_URL = 'https://ritiksinha2727.pythonanywhere.com';

const CartItem = ({ item, removeItem }) => (
  <article className="cart-item" data-aos="fade-up">
    <img src={item.image} alt={item.name} />
    <div className="item-details">
      <h4>{item.name}</h4>
      <p>Size: {item.size}, Color: {item.color}</p>
      <div className="quantity">
        <span>Qty: {item.quantity}</span>
      </div>
    </div>
    <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
    <button className="remove-btn" onClick={() => removeItem(item.uid)}>
      <FaTrash />
    </button>
  </article>
);

const CartSummary = ({ items, discountAmount }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - (isNaN(discountAmount) ? 0 : discountAmount);
  const [promoCode, setPromoCode] = useState('');

  return (
    <aside className="cart-summary" data-aos="zoom-in">
      <h3>Order Summary</h3>

      <div className="summary-line">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-line">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      {discountAmount > 0 && (
        <div className="summary-line">
          <span>Discount</span>
          <span>- ₹{discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="summary-line promo">
        <input
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button>Apply</button>
      </div>

      <div className="summary-line total">
        <strong>Total</strong>
        <strong>₹{total.toFixed(2)}</strong>
      </div>

      <button className="checkout-btn" onClick={() => navigate('/payment')}>
        Proceed to Checkout
      </button>
      <button className="continue-btn">Continue Shopping</button>
    </aside>
  );
};

const RecommendationCard = ({ product }) => (
  <div className="suggestion-card" data-aos="flip-up">
    <img src={product.image} alt={product.name} />
    <p>{product.name}</p>
    <p className="price">
      <span className="discounted-price">₹{product.discountedPrice.toFixed(2)}</span>
    </p>
  </div>
);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
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
  AOS.init({ duration: 800, once: true });

  axios
    .get(`${BASE_URL}/order/my-cart/`)
    .then((res) => {
      const groupedItems = {};

      res.data.cart_items.forEach((item) => {
        const key = `${item.product.id}_${item.size.size_code}`;
        if (!groupedItems[key]) {
          groupedItems[key] = {
            uid: key,
            id: item.product.id,
            name: item.product.prod_name,
            color: item.product.color,
            color_code: item.product.color_code,
            size: item.size.size_code,
            quantity: item.quantity,
            price: item.product.offer_price,
            image: `${BASE_URL}${item.product.product_images[0]?.image}`,
          };
        } else {
          // Add quantity if already present
          groupedItems[key].quantity += item.quantity;
        }
      });

      setCartItems(Object.values(groupedItems));
      setDiscountAmount(res.data.discount_amount || 0);
    })
    .catch((err) => console.error('Error loading cart:', err));
}, []);


  const removeItem = (uid) => {
    setCartItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  return (
    <div className="cart-page">
      <Header />
      <main className="cart-container">
        <section className="cart-items">
          <h2 data-aos="fade-right">Your Shopping Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.uid} item={item} removeItem={removeItem} />
            ))
          ) : (
            <p className="empty-cart" data-aos="fade-in">Your cart is empty.</p>
          )}
        </section>

        <CartSummary items={cartItems} discountAmount={discountAmount} />
      </main>

      <section className="recommendations">
        <h3 data-aos="fade-up">You May Also Like</h3>
        <div className="product-suggestions">
          {recommendations.map((product) => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;

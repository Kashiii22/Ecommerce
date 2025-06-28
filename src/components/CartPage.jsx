import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CartPage.css';
import arrivalImage from '../assets/arrival3.png';
import Footer from './Footer.jsx';
import Header from './Header.jsx'
import { FaHeart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';



const CartItem = ({ item, updateQuantity, removeItem }) => (
  <article className="cart-item" data-aos="fade-up">
    <img src={item.image} alt={item.name} />
    <div className="item-details">
      <h4>{item.name}</h4>
      <p>Size: {item.size}, Color: {item.color}</p>
      <div className="quantity">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <FaMinus />-
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <FaPlus />+
        </button>
      </div>
    </div>
    <div className="item-price">${item.price.toFixed(2)}</div>
    <button className="remove-btn" onClick={() => removeItem(item.id)}>
      <FaTrash />
    </button>
  </article>
);

const CartSummary = ({ items }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [promoCode, setPromoCode] = useState('');

  const handleCheckout = () => {
    navigate('/payment'); // 🔁 Redirect to PaymentPage
  };

  return (
    <aside className="cart-summary" data-aos="zoom-in">
      <h3>Order Summary</h3>
      <div className="summary-line">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-line">
        <span>Shipping</span>
        <span>Free</span>
      </div>
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
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <button className="checkout-btn" onClick={handleCheckout}>
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
      <span className="discounted-price">${product.discountedPrice.toFixed(2)}</span>
    </p>
  </div>
);

const CartPage = () => {
  <Header/>
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Stylish T-Shirt',
      size: 'M',
      color: 'Red',
      price: 29.99,
      quantity: 1,
      image: arrivalImage
    },
    {
      id: 2,
      name: 'Stylish T-Shirt',
      size: 'M',
      color: 'Red',
      price: 29.99,
      quantity: 1,
      image: arrivalImage
    }
  ]);

  const [recommendations] = useState([
    {
      id: 3,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      price: 59.99,
      discountedPrice: 39.99
    },
    {
      id: 4,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      price: 59.99,
      discountedPrice: 39.99
    },
    {
      id: 5,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      price: 59.99,
      discountedPrice: 39.99
    },
    {
      id: 6,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      price: 59.99,
      discountedPrice: 39.99
    },
    {
      id: 7,
      name: 'Cool Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      price: 59.99,
      discountedPrice: 39.99
    }
  ]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-page">
      <Header />
      <main className="cart-container">
        <section className="cart-items">
          <h2 data-aos="fade-right">Your Shopping Cart</h2>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </section>
        <CartSummary items={cartItems} />
      </main>

      <section className="recommendations">
        <h3 data-aos="fade-up">You May Also Like</h3>
        <div className="product-suggestions">
          {recommendations.map(product => (
            <RecommendationCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;

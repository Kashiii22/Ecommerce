import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import './PaymentPage.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaCreditCard, FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const BASE_URL = 'https://ritiksinha2727.pythonanywhere.com';



const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
const navigate = useNavigate();
  const shipping = 0;
  const tax = 0;
  const grandTotal = totalAmount + shipping + tax;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios.get(`${BASE_URL}/order/checkout/`)
      .then(res => {
        const grouped = {};

        res.data.cart_items.forEach((item) => {
          const key = `${item.product.id}_${item.size.size_code}`;

          if (!grouped[key]) {
            grouped[key] = {
              id: item.product.id,
              name: item.product.prod_name,
              description: item.product.category,
              price: item.product.offer_price,
              quantity: 0,
              size: item.size.size,
              sizeCode: item.size.size_code,
              image: `${BASE_URL}${item.product.product_images[0]?.image}`,
            };
          }

          grouped[key].quantity += item.quantity;
        });

        const mergedItems = Object.values(grouped);
        setCartItems(mergedItems);

        const calculatedTotal = mergedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(calculatedTotal);
      })
      .catch(err => console.error('Checkout error:', err));
  }, []);

  return (
    <>
      <Header />
      <div className="payment-page">
        <h2 data-aos="fade-down">Checkout</h2>

        <div className="payment-form">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-section" data-aos="fade-right">
              <h3>Shipping Address</h3>
              <input type="text" placeholder="First & Last Name" />
              <input type="text" placeholder="Address 1" />
              <input type="text" placeholder="Address 2 (optional)" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
              <input type="text" placeholder="Zip Code" />
            </div>

            <div className="form-section" data-aos="fade-left">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <button className={paymentMethod === 'card' ? 'active' : ''} onClick={() => setPaymentMethod('card')}>
                  <FaCreditCard /> Card
                </button>
                <button className={paymentMethod === 'wallet' ? 'active' : ''} onClick={() => setPaymentMethod('wallet')}>
                  <FaWallet /> Wallet
                </button>
                <button className={paymentMethod === 'cod' ? 'active' : ''} onClick={() => setPaymentMethod('cod')}>
                  <FaMoneyBillWave /> COD
                </button>
              </div>

              {paymentMethod === 'card' && (
                <>
                  <input type="text" placeholder="Name on Card" />
                  <input type="text" placeholder="Card Number" />
                  <div className="card-logos">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />
                  </div>
                  <div className="row">
                    <input type="text" placeholder="MM" maxLength="2" />
                    <input type="text" placeholder="YYYY" maxLength="4" />
                    <input type="text" placeholder="CVV" maxLength="4" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary" data-aos="zoom-in">
            <h3>Order Summary</h3>

            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div key={`${item.id}_${item.sizeCode}_${idx}`} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-details">
                    <p className="product-title">{item.name}</p>
                    <p className="product-desc">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <div className="product-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p>Loading cart...</p>
            )}

            <div className="summary-line"><span>Subtotal</span><span>₹{totalAmount.toFixed(2)}</span></div>
            <div className="summary-line"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
            <div className="summary-line"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="summary-line total">
              <strong>Total</strong>
              <strong>₹{grandTotal.toFixed(2)}</strong>
            </div>

<button className="place-order-btn" onClick={() => navigate('/order-success')}>
  Place Order
</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PaymentPage;

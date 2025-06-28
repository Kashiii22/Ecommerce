import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './PaymentPage.css';
import arrivalImage from '../assets/arrival3.png';
import Header from './Header';
import { FaCreditCard, FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const PaymentPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
      <>
       <Header/>
    <div className="payment-page">
   
      <h2 data-aos="fade-down">Checkout</h2>

      <div className="payment-form">
        {/* Left Column */}
        <div className="form-column">
          {/* Shipping Address */}
          <div className="form-section" data-aos="fade-right">
            <h3>Shipping Address</h3>
            <input type="text" placeholder="First & Last Name" />
            <input type="text" placeholder="Address 1" />
            <input type="text" placeholder="Address 2 (optional)" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
          </div>

          {/* Payment Method */}
          <div className="form-section" data-aos="fade-left">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <button
                className={paymentMethod === 'card' ? 'active' : ''}
                onClick={() => setPaymentMethod('card')}
              >
                <FaCreditCard /> Card
              </button>
              <button
                className={paymentMethod === 'wallet' ? 'active' : ''}
                onClick={() => setPaymentMethod('wallet')}
              >
                <FaWallet /> Wallet
              </button>
              <button
                className={paymentMethod === 'cod' ? 'active' : ''}
                onClick={() => setPaymentMethod('cod')}
              >
                <FaMoneyBillWave /> COD
              </button>
            </div>

            {paymentMethod === 'card' && (
              <>
                <input type="text" placeholder="Name on Card" />
                <input type="text" placeholder="Card Number" />

                <div className="card-logos">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="MasterCard"
                  />
                </div>

                <div className="row">
                  <input type="text" placeholder="MM (Month)" maxLength="2" />
                  <input type="text" placeholder="YYYY (Year)" maxLength="4" />
                  <input type="text" placeholder="CVV" maxLength="4" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-summary" data-aos="zoom-in">
          <h3>Order Summary</h3>
          <div className="order-item">
            <img
              src={arrivalImage}
              alt="Product"
            />
            <div className="order-item-details">
              <p className="product-title">Tshirt</p>
              <p className="product-desc">Premium quality.</p>
            </div>
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>$99.00</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="summary-line">
            <span>Tax</span>
            <span>$8.92</span>
          </div>
          <div className="summary-line total">
            <strong>Total</strong>
            <strong>$112.92</strong>
          </div>

          <button className="place-order-btn">Place Order</button>
        </div>
      </div>
    </div>
      </>
  );
};

export default PaymentPage;

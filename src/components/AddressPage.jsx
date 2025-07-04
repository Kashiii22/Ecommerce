import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WebFont from 'webfontloader';
import './AddressPage.css'; // or create AddressPage.css if you prefer
import Footer from './Footer';

const AddressPage = () => {
  const [address, setAddress] = useState({
    line1: 'ABC Street',
    line2: '',
    city: 'Delhi',
    state: 'Delhi',
    zip: '110001',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    WebFont.load({
      google: { families: ['Poppins:400,600', 'Playfair Display:600,700'] },
    });
  }, []);

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="profile-page-center">
        <div className="profile-wrapper">
          <div className="main-content">
            <h2 className="profile-heading" data-aos="fade-down">Shipping Address</h2>

            <div className="profile-section" data-aos="fade-left">
              <div className="form-group">
                <label>Address Line 1</label>
                <input value={address.line1} onChange={e => handleAddressChange('line1', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Address Line 2</label>
                <input value={address.line2} onChange={e => handleAddressChange('line2', e.target.value)} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input value={address.city} onChange={e => handleAddressChange('city', e.target.value)} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input value={address.state} onChange={e => handleAddressChange('state', e.target.value)} />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input value={address.zip} onChange={e => handleAddressChange('zip', e.target.value)} />
              </div>
              <div className="orders-btn" data-aos="fade-up">
                <button className="save-btn">Save Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressPage;

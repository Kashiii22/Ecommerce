import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './UserProfile.css';
import WebFont from 'webfontloader';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Kashish Mukheja',
    email: 'kashish@example.com',
    phone: '9876543210',
    dob: '2002-04-10',
    gender: 'Female',
    address: {
      line1: 'ABC Street',
      line2: '',
      city: 'Delhi',
      state: 'Delhi',
      zip: '110001',
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    WebFont.load({
      google: { families: ['Poppins:400,600', 'Playfair Display:600,700'] },
    });
  }, []);

  const handleAddressChange = (field, value) => {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      }
    }));
  };

  return (
    <div className="user-profile-container">
      <h2 className="profile-heading" data-aos="fade-down">My Profile</h2>

      {/* Profile Info */}
      <div className="profile-section" data-aos="fade-right">
        <h3>Personal Information</h3>
        <div className="form-group">
          <label>Name</label>
          <input value={user.name} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={user.email} disabled />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input value={user.phone} disabled />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" value={user.dob} disabled />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={user.gender} disabled>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Address Info */}
      <div className="profile-section" data-aos="fade-left">
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label>Address Line 1</label>
          <input value={user.address.line1} onChange={e => handleAddressChange('line1', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address Line 2</label>
          <input value={user.address.line2} onChange={e => handleAddressChange('line2', e.target.value)} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input value={user.address.city} onChange={e => handleAddressChange('city', e.target.value)} />
        </div>
        <div className="form-group">
          <label>State</label>
          <input value={user.address.state} onChange={e => handleAddressChange('state', e.target.value)} />
        </div>
        <div className="form-group">
          <label>ZIP Code</label>
          <input value={user.address.zip} onChange={e => handleAddressChange('zip', e.target.value)} />
        </div>
      </div>

      <div className="save-btn-container" data-aos="fade-up">
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfile;

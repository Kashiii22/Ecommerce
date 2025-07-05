import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import Footer from './Footer';
import Header from './Header';

import { FaUser, FaBox, FaHome, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: 'Kashish Mukheja',
    email: 'kashish@example.com',
    phone: '9876543210',
    dob: '2002-04-10',
    gender: 'Female',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    WebFont.load({
      google: { families: ['Poppins:400,600', 'Playfair Display:600,700'] },
    });
  }, []);

  return (
    <>
      <Header />
      <div className="profile-page-center">
        <div className="profile-wrapper">
          <div className="content-row">
            {/* Sidebar */}
            <div className="sidebar">
              <div className="profile-pic-box">
                <img src="https://via.placeholder.com/100" alt="Profile" />
                <h4>{user.name}</h4>
              </div>
              <ul className="sidebar-menu">
                <li className="active"><FaUser className="icon" /> My Profile</li>
                <li onClick={() => navigate('/orders')}><FaBox className="icon" /> My Orders</li>
                <li onClick={() => navigate('/address')}><FaHome className="icon" /> Address</li>
                <li><FaCreditCard className="icon" /> Saved Cards</li>
                <li><FaSignOutAlt className="icon" /> Logout</li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
              <h2 className="profile-heading" data-aos="fade-down">My Profile</h2>
              <div className="profile-section" data-aos="fade-up">
                <h3>Personal Information</h3>
                <div className="profile-form-grid">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;

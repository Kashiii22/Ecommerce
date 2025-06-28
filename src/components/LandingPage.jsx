import React from 'react';
import HeroSection from './HeroSection';
import CategoryCards from './CategoryCards';
import NewArrivals from './NewArrivals';
import Header from './Header';
import Fashion from './Fashion';
import Premium from './Premium';
import Footer from './Footer'
const LandingPage = () => {
  return (
 <>
   
    <div>
         <Header/>
      <HeroSection />
      <CategoryCards />
      <NewArrivals />
      <Fashion/>
      <Premium/>
      <Footer/>
    </div></>
  );
};

export default LandingPage;

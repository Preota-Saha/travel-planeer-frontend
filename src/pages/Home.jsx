import React from 'react';
import Hero from '../components/Hero.jsx';
import PopularDestinations from '../components/Home/PopularDestinations.jsx';
import Features from '../components/Home/Features.jsx';
import CTA from '../components/Home/CTA.jsx';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularDestinations />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20 lg:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
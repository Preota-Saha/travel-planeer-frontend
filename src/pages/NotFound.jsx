import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl sm:text-9xl font-black text-base-content/5 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl animate-bounce">
              🗺️
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-black text-base-content mb-4">
          Page Not Found
        </h1>
        <p className="text-base-content/60 text-sm sm:text-base mb-8 max-w-md mx-auto">
          Oops! It seems like you've wandered off the map. 
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="gradient"
              size="lg"
              className="shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
            >
              🏠 Back to Home
            </Button>
          </Link>
          <Link to="/destination">
            <Button
              variant="outline"
              size="lg"
            >
              🌍 Explore Destinations
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 p-6 bg-base-200 rounded-2xl">
          <p className="text-base-content/60 text-sm mb-3">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Home
            </Link>
            <span className="text-base-content/20">•</span>
            <Link to="/destination" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Destinations
            </Link>
            <span className="text-base-content/20">•</span>
            <Link to="/tripplanner" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Trip Planner
            </Link>
            <span className="text-base-content/20">•</span>
            <Link to="/aboutus" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              About Us
            </Link>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-6 text-base-content/40 text-xs">
          <span>💡 Fun fact: Bangladesh has 3 UNESCO World Heritage Sites!</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
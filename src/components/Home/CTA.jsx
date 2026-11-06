import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
          <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
            Start Your Journey
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Ready to Explore Bangladesh?
        </h2>
        
        <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Start planning your dream trip today. Discover amazing destinations, 
          manage your budget, and create unforgettable memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/tripplanner">
            <Button
              variant="gradient"
              size="lg"
              className="shadow-2xl shadow-black/20 hover:shadow-3xl hover:shadow-orange-500/30"
            >
              🚀 Plan Your Trip Now
            </Button>
          </Link>
          
          <Link to="/destination">
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:text-white hover:bg-white/20 border-2 border-white/30 hover:border-white/50"
            >
              Explore Destinations →
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <p className="text-white font-black text-2xl">15+</p>
            <p className="text-white/80 text-xs uppercase tracking-wider">Destinations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <p className="text-white font-black text-2xl">50+</p>
            <p className="text-white/80 text-xs uppercase tracking-wider">Attractions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 col-span-2 sm:col-span-1">
            <p className="text-white font-black text-2xl">100%</p>
            <p className="text-white/80 text-xs uppercase tracking-wider">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
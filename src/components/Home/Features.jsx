import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '📍',
      title: 'Discover Destinations',
      description: 'Explore the most beautiful places in Bangladesh with detailed information and stunning visuals.'
    },
    {
      icon: '💰',
      title: 'Budget Planning',
      description: 'Plan your trips within your budget with our smart cost calculator and expense tracker.'
    },
    {
      icon: '🗺️',
      title: 'Trip Management',
      description: 'Organize your travel itinerary, track expenses, and manage all aspects of your journey.'
    },
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'Get personalized destination suggestions based on your preferences and budget.'
    },
    {
      icon: '🏨',
      title: 'Accommodation Finder',
      description: 'Find the best places to stay with detailed information about amenities and costs.'
    },
    {
      icon: '🚌',
      title: 'Transport Options',
      description: 'Choose from various transport options and plan your travel routes efficiently.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3 tracking-tight">
            Plan Your Perfect Trip
          </h2>
          <p className="text-base-content/60 text-sm sm:text-base max-w-2xl mx-auto">
            We provide everything you need to plan an unforgettable journey across Bangladesh
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200 hover:border-primary/20"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-base-content font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/60 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative gradient line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
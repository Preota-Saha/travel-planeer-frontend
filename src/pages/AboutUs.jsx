import React from 'react';

const AboutUs = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', description: 'Frontend library for building user interfaces' },
    { name: 'Vite', icon: '⚡', description: 'Next generation frontend tooling' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'DaisyUI', icon: '🌸', description: 'Component library for Tailwind CSS' },
    { name: 'React Router', icon: '🚏', description: 'Declarative routing for React' },
    { name: 'Context API', icon: '🔗', description: 'State management for React applications' }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              About Us
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3 tracking-tight">
            About Travel Planner
          </h1>
          <p className="text-base-content/60 text-sm sm:text-base max-w-2xl mx-auto">
            Learn more about our project, mission, and the technology that powers it
          </p>
        </div>

        {/* About Project */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-base-200 rounded-2xl p-8">
            <div className="text-4xl mb-4">🌏</div>
            <h2 className="text-base-content font-bold text-2xl mb-3">About the Project</h2>
            <p className="text-base-content/70 text-sm leading-relaxed mb-4">
              Travel Planner is an academic project developed as part of the Software Development II course. 
              It's designed to help travelers plan their trips across Bangladesh by providing destination 
              information, budget tracking, and trip management features.
            </p>
            <p className="text-base-content/70 text-sm leading-relaxed">
              The project demonstrates modern React development practices, responsive design, 
              and state management using Context API.
            </p>
          </div>

          <div className="bg-base-200 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-base-content font-bold text-2xl mb-3">Our Mission</h2>
            <p className="text-base-content/70 text-sm leading-relaxed mb-4">
              To empower travelers with the tools they need to plan memorable journeys 
              across Bangladesh while staying within their budget.
            </p>
            <h2 className="text-base-content font-bold text-2xl mb-3 mt-6">Our Vision</h2>
            <p className="text-base-content/70 text-sm leading-relaxed">
              To become the go-to platform for travel planning in Bangladesh, 
              making trip organization accessible, efficient, and enjoyable for everyone.
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-base-content font-bold text-2xl text-center mb-6">
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <div key={tech.name} className="bg-base-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-base-content font-bold text-lg mb-2">{tech.name}</h3>
                <p className="text-base-content/60 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-4">👨‍💻</div>
            <h2 className="text-base-content font-bold text-2xl mb-2">Developer</h2>
            <p className="text-base-content/70 text-sm leading-relaxed mb-2">
              This project is developed by a passionate software engineering student 
              dedicated to creating user-friendly and accessible web applications.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-base-100 rounded-full text-sm text-base-content/70">
                📧 developer@travelplanner.com
              </span>
              <span className="px-4 py-2 bg-base-100 rounded-full text-sm text-base-content/70">
                📍 Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-base-200 rounded-2xl">
            <p className="text-2xl font-black text-primary">15+</p>
            <p className="text-base-content/60 text-xs uppercase tracking-wider">Destinations</p>
          </div>
          <div className="text-center p-4 bg-base-200 rounded-2xl">
            <p className="text-2xl font-black text-secondary">50+</p>
            <p className="text-base-content/60 text-xs uppercase tracking-wider">Attractions</p>
          </div>
          <div className="text-center p-4 bg-base-200 rounded-2xl">
            <p className="text-2xl font-black text-accent">6</p>
            <p className="text-base-content/60 text-xs uppercase tracking-wider">Categories</p>
          </div>
          <div className="text-center p-4 bg-base-200 rounded-2xl">
            <p className="text-2xl font-black text-primary">100%</p>
            <p className="text-base-content/60 text-xs uppercase tracking-wider">Free to Use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
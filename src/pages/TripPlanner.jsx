import React from 'react';
import { TripProvider } from '../context/TripContext.jsx';
import TripForm from '../components/Planner/TripForm.jsx';
import BudgetCard from '../components/Planner/BudgetCard.jsx';
import TripSummary from '../components/Planner/TripSummary.jsx';

const TripPlanner = () => {
  return (
    <TripProvider>
      <div className="min-h-screen py-8 sm:py-12 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                Plan Your Journey
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content mb-3 tracking-tight">
              Trip Planner
            </h1>
            <p className="text-base-content/60 text-sm sm:text-base max-w-2xl">
              Plan your perfect trip by selecting a destination, choosing transportation, 
              and finding accommodation that fits your budget.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Trip Form */}
            <div className="lg:col-span-2">
              <TripForm />
            </div>

            {/* Right Column - Budget & Summary */}
            <div className="lg:col-span-1 space-y-6">
              <BudgetCard />
              <TripSummary />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-10 p-6 bg-base-200 rounded-2xl border border-base-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="text-base-content font-bold text-sm mb-1">Travel Tips</h4>
                <ul className="text-base-content/60 text-sm space-y-1.5">
                  <li>• Plan your trip during the off-season for better deals</li>
                  <li>• Book transportation and accommodation in advance</li>
                  <li>• Keep a buffer of 10-15% in your budget for unexpected expenses</li>
                  <li>• Research local attractions and activities before you go</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TripProvider>
  );
};

export default TripPlanner;
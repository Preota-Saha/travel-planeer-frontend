import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTripPlan } from '../api.js';
import useApiRequest from '../hooks/useApiRequest';
import ErrorMessage from '../components/common/ErrorMessage';

const formatTaka = (n) => `৳${(Number(n) || 0).toLocaleString()}`;

const TripPlanView = () => {
  const { id } = useParams();

  const {
    data: trip,
    loading,
    error,
    refetch
  } = useApiRequest(() => getTripPlan(id), [id]);

  // 404 from the backend → friendly state with a link back to the planner.
  if (error && error.status === 404) {
    return (
      <section className="min-h-screen py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-7xl mb-4">🗺️</div>
          <h2 className="text-3xl font-black text-white mb-3">
            Trip plan not found
          </h2>
          <p className="text-gray-300 mb-6">
            We couldn't find a trip plan with the id{' '}
            <code className="text-amber-400">{id}</code>.
          </p>
          <Link
            to="/tripplanner"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300"
          >
            ← Back to planner
          </Link>
        </div>
      </section>
    );
  }

  // Loading skeleton — keeps the layout stable.
  if (loading) {
    return (
      <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-3/4 bg-white/10 rounded-lg animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 bg-white/5 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Other errors (network, 500, etc.)
  if (error) {
    return (
      <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage
            message="Couldn't load this trip plan from the server."
            retry={refetch}
          />
        </div>
      </section>
    );
  }

  if (!trip) return null;

  const {
    location,
    place,
    transport,
    accommodation,
    people,
    days,
    transport_cost,
    accommodation_cost,
    total_cost,
    created_at
  } = trip;

  // Format the ISO timestamp into something readable for the user.
  const savedAt = created_at
    ? new Date(created_at).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    : null;

  return (
    <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/tripplanner"
            className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
          >
            ← Back to planner
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
              Saved Trip #{trip.id}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-md">
            {place?.name || 'Trip Plan'}
          </h1>
          {savedAt && (
            <p className="text-gray-400 text-sm">
              Saved on {savedAt}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* Starting location */}
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1 text-gray-400">
              🏠 Starting location
            </p>
            <p className="text-white font-bold text-lg">
              {location?.name || 'Unknown'}
            </p>
          </div>

          {/* Destination */}
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1 text-gray-400">
              📍 Destination
            </p>
            <p className="text-white font-bold text-lg">
              {place?.name || 'Unknown'}
            </p>
            {place?.slug && (
              <Link
                to={`/destination/${place.slug}`}
                className="text-amber-400 hover:text-amber-300 text-xs mt-1 inline-block transition-colors"
              >
                View place details →
              </Link>
            )}
          </div>

          {/* Transport + Accommodation row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1 text-gray-400">
                🚌 Transportation
              </p>
              <p className="text-white font-bold text-base">
                {transport?.name || 'Unknown'}
              </p>
              <p className="text-amber-400 font-bold text-sm mt-2">
                {formatTaka(transport_cost)}
              </p>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1 text-gray-400">
                🏨 Accommodation
              </p>
              <p className="text-white font-bold text-base">
                {accommodation?.name || 'Unknown'}
              </p>
              <p className="text-amber-400 font-bold text-sm mt-2">
                {formatTaka(accommodation_cost)}
              </p>
            </div>
          </div>

          {/* People + Days */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                People
              </p>
              <p className="text-white font-black text-3xl mt-1">{people}</p>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                Days
              </p>
              <p className="text-white font-black text-3xl mt-1">{days}</p>
            </div>
          </div>

          {/* Total */}
          <div className="p-6 bg-primary/10 rounded-2xl border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">Total Cost</span>
              <span className="text-amber-400 font-black text-3xl">
                {formatTaka(total_cost)}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Transport + accommodation, calculated by the backend.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/tripplanner" className="flex-1">
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300">
                Plan another trip
              </button>
            </Link>
            {place?.slug && (
              <Link to={`/destination/${place.slug}`} className="flex-1">
                <button className="w-full py-3 bg-white/5 text-amber-300 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10">
                  Explore {place.name}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPlanView;
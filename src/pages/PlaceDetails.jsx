import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlace } from '../api.js';
import useApiRequest from '../hooks/useApiRequest';
import ErrorMessage from '../components/common/ErrorMessage';

// Fallback image when a place or experience item has no image.
const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x400/1f2937/9ca3af?text=No+Image';

// Renders one experience section (attractions / foods / shopping).
// Skips itself entirely if the array is missing or empty.
function ExperienceSection({ title, emoji, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
        <span aria-hidden="true">{emoji}</span>
        <span>{title}</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={item.image || PLACEHOLDER_IMAGE}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold text-base mb-1">
                {item.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PlaceDetails = () => {
  const { slug } = useParams();

  const {
    data: place,
    loading,
    error,
    refetch
  } = useApiRequest(() => getPlace(slug), [slug]);

  // 404 from the backend → friendly "Place not found" state.
  if (error && error.status === 404) {
    return (
      <section className="min-h-screen py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-7xl mb-4">🗺️</div>
          <h2 className="text-3xl font-black text-white mb-3">
            Place not found
          </h2>
          <p className="text-gray-300 mb-6">
            We couldn't find a place with the slug{' '}
            <code className="text-amber-400">{slug}</code>.
          </p>
          <Link
            to="/destination"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300"
          >
            ← Back to destinations
          </Link>
        </div>
      </section>
    );
  }

  // Loading skeleton (mirrors the layout so the page doesn't jump).
  if (loading) {
    return (
      <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-72 sm:h-96 bg-white/10 rounded-2xl animate-pulse mb-8"></div>
          <div className="h-10 w-2/3 bg-white/10 rounded-lg animate-pulse mb-3"></div>
          <div className="h-6 w-full bg-white/10 rounded-lg animate-pulse mb-2"></div>
          <div className="h-6 w-5/6 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </section>
    );
  }

  // Other errors (network etc.)
  if (error) {
    return (
      <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage
            message="Couldn't load this place from the server."
            retry={refetch}
          />
        </div>
      </section>
    );
  }

  if (!place) return null;

  const { name, description, cover_image, experiences = {} } = place;
  const { attractions, foods, shopping } = experiences;

  return (
    <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/destination"
            className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
          >
            ← Back to destinations
          </Link>
        </div>

        {/* Hero */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-white/10">
          <img
            src={cover_image || PLACEHOLDER_IMAGE}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/90 via-[#0d1f1a]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {name}
            </h1>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            {description}
          </p>
        )}

        {/* Experience sections */}
        <ExperienceSection
          title="Attractions"
          emoji="📍"
          items={attractions}
        />
        <ExperienceSection
          title="Foods"
          emoji="🍽️"
          items={foods}
        />
        <ExperienceSection
          title="Shopping"
          emoji="🛍️"
          items={shopping}
        />

        {/* Plan a trip CTA — passes the place slug so the planner can pre-select it. */}
        <div className="mt-12 text-center">
          <Link to={`/tripplanner?place=${encodeURIComponent(slug)}`}>
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-500/20">
              Plan a trip here →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlaceDetails;
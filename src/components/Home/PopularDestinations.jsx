import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllPlaces } from "../../api.js";
import useApiRequest from "../../hooks/useApiRequest";
import ErrorMessage from "../common/ErrorMessage";

// Fallback image for places without a cover_image.
const PLACEHOLDER_IMAGE =
  "https://placehold.co/800x500/1f2937/9ca3af?text=No+Image";

// How many places to surface on the homepage.
const POPULAR_LIMIT = 4;

function PopularDestinations() {
  const [activeSlug, setActiveSlug] = useState(null);

  // Fetch all places (loops over categories under the hood), then keep
  // the first POPULAR_LIMIT. Memoized so the slice only re-runs if the
  // upstream list actually changes.
  const {
    data: allPlaces,
    loading,
    error,
    refetch
  } = useApiRequest(getAllPlaces, []);

  const popular = useMemo(() => {
    if (!Array.isArray(allPlaces)) return [];
    return allPlaces.slice(0, POPULAR_LIMIT);
  }, [allPlaces]);

  // Once data lands, seed the active selection to the first item (or
  // re-seed if a stale slug is no longer in the list).
  const activePlace = useMemo(() => {
    if (popular.length === 0) return null;
    return (
      popular.find((p) => p.slug === activeSlug) || popular[0]
    );
  }, [popular, activeSlug]);

  // Error state — keeps the section chrome but bails out early.
  if (error) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage
            message="Couldn't load popular destinations from the server."
            retry={refetch}
          />
        </div>
      </section>
    );
  }

  // Loading state — render lightweight skeletons so the section height
  // stays roughly stable while the request is in flight.
  if (loading || !activePlace) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">
        {/* Ambient Subtle Golden Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
              <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
                Discover Wonders
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-md">
              Popular Destinations
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
              Discover the most beautiful places in Bangladesh, from the longest sea beach to the highest hills
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-4 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 border border-white/5 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
            <div className="lg:col-span-8">
              <div className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const coverImage =
    activePlace.cover_image && activePlace.cover_image.length > 0
      ? activePlace.cover_image
      : PLACEHOLDER_IMAGE;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">

      {/* Ambient Subtle Golden Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
              Discover Wonders
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-md">
            Popular Destinations
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
            Discover the most beautiful places in Bangladesh, from the longest sea beach to the highest hills
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* Left Side - Destination List */}
          <div className="lg:col-span-4">
            <div className="space-y-3">
              {popular.map((dest) => {
                const isActive = activePlace.slug === dest.slug;
                const thumb =
                  dest.cover_image && dest.cover_image.length > 0
                    ? dest.cover_image
                    : PLACEHOLDER_IMAGE;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setActiveSlug(dest.slug)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left border relative overflow-hidden group
                      ${isActive
                        ? 'bg-gradient-to-r from-white/10 to-amber-500/10 border-amber-400/50 shadow-lg shadow-amber-900/20 backdrop-blur-sm'
                        : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 backdrop-blur-sm'
                      }
                    `}
                  >
                    {/* Small Image */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img
                        src={thumb}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Container */}
                    <div className="flex-1 min-w-0 flex flex-col relative z-10">
                      <h3 className="font-bold text-xs sm:text-sm truncate relative">
                        <span className={`
                          absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-200 to-amber-400 bg-clip-text text-transparent transition-opacity duration-500
                          ${isActive ? 'opacity-100' : 'opacity-0'}
                        `}>
                          {dest.name}
                        </span>
                        <span className={`
                          transition-opacity duration-500 text-gray-300
                          ${isActive ? 'opacity-0' : 'opacity-100'}
                        `}>
                          {dest.name}
                        </span>
                      </h3>

                      <p className="text-amber-300/70 text-[10px] sm:text-xs capitalize mt-0.5">
                        📍 {dest.category?.name || 'Bangladesh'}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex-shrink-0 text-amber-500 relative z-10">
                        <svg className="w-4 h-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* View All Button - Links to Destination Page */}
            <div className="mt-4">
              <Link to="/destination">
                <button className="w-full py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-amber-500/20 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-900/30 text-sm relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative z-10 text-amber-400 group-hover:text-white transition-colors">View All Destinations →</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Detailed View */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 transition-all duration-300 hover:border-amber-500/20 relative">

              <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden">
                <img
                  src={coverImage}
                  alt={activePlace.name}
                  className="w-full h-full object-cover brightness-110 transition-transform duration-700 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/80 via-[#0d1f1a]/10 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl mb-0.5 drop-shadow-xl">
                    {activePlace.name}
                  </h3>
                  {activePlace.category?.name && (
                    <p className="text-amber-300/90 text-xs sm:text-sm drop-shadow-md flex items-center gap-1">
                      <span>📍</span> {activePlace.category.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                  {activePlace.description || 'Discover this beautiful destination in Bangladesh.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Link
                    to={`/tripplanner?place=${encodeURIComponent(activePlace.slug)}`}
                    className="flex-1"
                  >
                    <button className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-400 text-[#162521] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/30 text-sm relative overflow-hidden group border border-amber-400/50">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative z-10">Plan Your Trip</span>
                    </button>
                  </Link>

                  <Link
                    to={`/destination/${activePlace.slug}`}
                    className="flex-1"
                  >
                    <button className="w-full py-2.5 bg-white/5 backdrop-blur-sm text-amber-300 font-regular rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.03] hover:text-white hover:shadow-md text-sm border border-white/10 hover:border-amber-400/30">
                      Learn More →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;

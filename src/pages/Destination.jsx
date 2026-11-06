import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getPlacesByCategory
} from '../api.js';
import useApiRequest from '../hooks/useApiRequest';
import ErrorMessage from '../components/common/ErrorMessage';

// Sentinel value for the client-only "All" tab (no category filter).
const ALL_TAB = 'all';

// Local emoji mapping by API category slug (backend doesn't send emojis).
// Falls back to a generic pin if a future slug isn't listed here.
const slugEmoji = {
  sea: '🏖️',
  hills: '⛰️',
  forest: '🌲',
  historical: '🏛️',
  village: '🏘️'
};

// Fallback cover image when a place has no cover_image.
const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x400/1f2937/9ca3af?text=No+Image';

// Reused for the "All" tab — fetch every category's slug and return them.
function getAllCategorySlugs() {
  return getCategories().then((cats) => cats.map((c) => c.slug));
}

const Destination = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_TAB);

  // Real categories for the tab bar (Phase 2).
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useApiRequest(getCategories, []);

  // Fetcher that depends on the currently selected tab.
  const fetcher = useCallback(() => {
    if (selectedCategory === ALL_TAB) {
      return getAllCategorySlugs().then((slugs) =>
        Promise.all(slugs.map((s) => getPlacesByCategory(s))).then((arrs) =>
          arrs.flat()
        )
      );
    }
    return getPlacesByCategory(selectedCategory);
  }, [selectedCategory]);

  // Places for the grid. Re-fetches when the tab changes.
  const {
    data: places,
    loading: placesLoading,
    error: placesError,
    refetch: refetchPlaces
  } = useApiRequest(fetcher, [selectedCategory]);

  // Client-side search filter (by name only — API has no search endpoint).
  const visiblePlaces = useMemo(() => {
    if (!places) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return places;
    return places.filter((p) => p.name.toLowerCase().includes(term));
  }, [places, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value;
    setSearchTerm(term);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(ALL_TAB);
  };

  return (
    <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-[#0d1f1a] via-[#152b24] to-[#142922] relative overflow-hidden">

      {/* Ambient subtle glows */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
              Explore Bangladesh
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-md">
            Discover Your Next Adventure
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
            From the world's longest beach to the largest mangrove forest, explore the beauty of Bangladesh
          </p>
        </div>

        {/* Category Tabs with Emojis */}
        <div className="mb-6">
          {categoriesError && (
            <ErrorMessage
              message="Couldn't load categories from the server."
              retry={refetchCategories}
            />
          )}

          {categoriesLoading && (
            <div className="flex gap-2 pb-2 min-w-max">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-10 w-28 bg-white/10 rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}

          {!categoriesLoading && !categoriesError && (
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2 min-w-max">
                {/* All tab — client-side only, means "no category filter" */}
                <button
                  key={ALL_TAB}
                  onClick={() => handleCategoryChange(ALL_TAB)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === ALL_TAB
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] shadow-lg shadow-amber-500/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="text-base">⭐</span>
                  <span>All</span>
                </button>

                {/* Real categories from GET /categories */}
                {(categoriesData || []).map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.slug
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] shadow-lg shadow-amber-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <span className="text-base">{slugEmoji[category.slug] || '📍'}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search destinations by name..."
                defaultValue={searchTerm}
                className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400/50 transition-colors text-white placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-amber-500 text-[#162521] font-semibold rounded-lg text-sm hover:bg-amber-400 transition-colors"
              >
                Search
              </button>
            </div>
            {(searchTerm || selectedCategory !== ALL_TAB) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </form>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
            <span>
              {visiblePlaces.length}{' '}
              {visiblePlaces.length === 1 ? 'destination' : 'destinations'} found
            </span>
          </div>
        </div>

        {/* Places Error */}
        {placesError && (
          <ErrorMessage
            message="Couldn't load destinations from the server."
            retry={refetchPlaces}
          />
        )}

        {/* Destination Grid */}
        {placesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white/5 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-white/10"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-10 bg-white/10 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !placesError && visiblePlaces.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">No destinations found</h3>
            <p className="text-gray-400 text-sm">Try a different search term</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-amber-500 text-[#162521] font-semibold rounded-xl hover:bg-amber-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePlaces.map((place) => (
              <div
                key={place.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/20 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={place.cover_image || PLACEHOLDER_IMAGE}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                    {place.name}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {place.description}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      to={`/tripplanner?place=${encodeURIComponent(place.slug)}`}
                      className="flex-1"
                    >
                      <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-[#162521] font-semibold rounded-xl text-sm hover:scale-[1.02] transition-all duration-300">
                        Plan Trip
                      </button>
                    </Link>
                    <Link to={`/destination/${place.slug}`} className="flex-1">
                      <button className="w-full py-2 bg-white/5 text-amber-300 font-medium rounded-xl text-sm hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Destination;
/**
 * Format currency in BDT (Bangladeshi Taka)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '৳0';
  return `৳${Number(amount).toLocaleString()}`;
};

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate average rating from an array of ratings
 * @param {number[]} ratings - Array of ratings
 * @returns {number} Average rating rounded to 1 decimal place
 */
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, curr) => acc + curr, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

/**
 * Filter destinations by search query
 * @param {Array} destinations - Array of destination objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered destinations
 */
export const filterDestinationsBySearch = (destinations, query) => {
  if (!query || !query.trim()) return destinations;
  const searchTerm = query.toLowerCase().trim();
  return destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm) ||
    dest.country.toLowerCase().includes(searchTerm) ||
    dest.category.toLowerCase().includes(searchTerm) ||
    dest.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Filter destinations by budget range
 * @param {Array} destinations - Array of destination objects
 * @param {Object} budgetRange - { min: number, max: number }
 * @returns {Array} Filtered destinations
 */
export const filterDestinationsByBudget = (destinations, budgetRange) => {
  let filtered = [...destinations];
  const min = parseFloat(budgetRange.min);
  const max = parseFloat(budgetRange.max);
  
  if (!isNaN(min)) {
    filtered = filtered.filter(d => d.budget >= min);
  }
  if (!isNaN(max)) {
    filtered = filtered.filter(d => d.budget <= max);
  }
  return filtered;
};

/**
 * Get unique categories from destinations
 * @param {Array} destinations - Array of destination objects
 * @returns {Array} Unique category strings
 */
export const getUniqueCategories = (destinations) => {
  if (!destinations || destinations.length === 0) return [];
  const categories = destinations.map(d => d.category);
  return [...new Set(categories)];
};

/**
 * Sort destinations by rating (highest first)
 * @param {Array} destinations - Array of destination objects
 * @returns {Array} Sorted destinations
 */
export const sortByRating = (destinations) => {
  return [...destinations].sort((a, b) => b.rating - a.rating);
};

/**
 * Get top N destinations by rating
 * @param {Array} destinations - Array of destination objects
 * @param {number} count - Number of top destinations to return
 * @returns {Array} Top N destinations
 */
export const getTopDestinations = (destinations, count = 6) => {
  const sorted = sortByRating(destinations);
  return sorted.slice(0, count);
};

/**
 * Calculate total trip cost
 * @param {Object} tripData - Trip data object
 * @returns {number} Total cost
 */
export const calculateTripCost = (tripData) => {
  const destinationCost = tripData.selectedDestination?.budget || 0;
  const transportCost = tripData.transport?.budget || 0;
  const accommodationCost = tripData.accommodation?.budget || 0;
  return destinationCost + transportCost + accommodationCost;
};

/**
 * Get emoji for destination category
 * @param {string} category - Destination category
 * @returns {string} Emoji for the category
 */
export const getCategoryEmoji = (category) => {
  const emojiMap = {
    'Beach': '🏖️',
    'Nature': '🌿',
    'Hill Station': '🏔️',
    'Island': '🏝️',
    'City': '🏙️',
    'Historical': '🏛️',
    'Lake': '🏞️'
  };
  return emojiMap[category] || '📍';
};

/**
 * Get color for destination category
 * @param {string} category - Destination category
 * @returns {string} Tailwind color class
 */
export const getCategoryColor = (category) => {
  const colorMap = {
    'Beach': 'text-blue-400 bg-blue-400/10',
    'Nature': 'text-emerald-400 bg-emerald-400/10',
    'Hill Station': 'text-purple-400 bg-purple-400/10',
    'Island': 'text-cyan-400 bg-cyan-400/10',
    'City': 'text-orange-400 bg-orange-400/10',
    'Historical': 'text-amber-400 bg-amber-400/10',
    'Lake': 'text-sky-400 bg-sky-400/10'
  };
  return colorMap[category] || 'text-base-content/60 bg-base-300/50';
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Generate a random ID (for demo purposes)
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
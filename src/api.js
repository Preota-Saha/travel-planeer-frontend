// Tiny fetch helper for the Travel Planner Laravel API.
// Base URL comes from .env.local (VITE_API_BASE_URL).
// On a non-OK response we throw an Error with .status and .body attached
// so callers can branch on 404 vs 422 vs other errors.

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, { method = 'GET', body } = {}) {
  const url = `${BASE_URL}${path}`;

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Try to parse JSON either way (success or error)
  let parsed = null;
  const text = await response.text();
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      // Not JSON — leave parsed as null
    }
  }

  if (!response.ok) {
    const error = new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    error.body = parsed;
    throw error;
  }

  return parsed;
}

// --- Endpoints ---

export function getCategories() {
  return request('/categories');
}

export function getPlacesByCategory(slug) {
  return request(`/categories/${slug}/places`);
}

export function getPlace(slug) {
  return request(`/places/${slug}`);
}

// Convenience: fetch places from every category and flatten into one array.
// There's no single "all places" endpoint, so this loops over categories.
export async function getAllPlaces() {
  const categories = await getCategories();
  const lists = await Promise.all(
    categories.map((c) => getPlacesByCategory(c.slug))
  );
  return lists.flat();
}

export function getLocations() {
  return request('/locations');
}

export function getTransports() {
  return request('/transports');
}

export function getAccommodations() {
  return request('/accommodations');
}

export function calculateTrip(payload) {
  return request('/trip-plan/calculate', { method: 'POST', body: payload });
}

export function saveTripPlan(payload) {
  return request('/trip-plans', { method: 'POST', body: payload });
}

export function getTripPlan(id) {
  return request(`/trip-plans/${id}`);
}
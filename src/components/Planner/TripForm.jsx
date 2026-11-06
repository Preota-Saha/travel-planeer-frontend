import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import {
  getLocations,
  getTransports,
  getAccommodations,
  getAllPlaces
} from '../../api.js';
import useApiRequest from '../../hooks/useApiRequest';
import ErrorMessage from '../common/ErrorMessage';

// Local emoji mapping by transport icon string (from the API).
// Falls back to a generic bus icon.
const transportIcon = {
  bus: '🚌',
  train: '🚂',
  van: '🚐',
  car: '🚗'
};

const TripForm = () => {
  const {
    tripData,
    costEstimate,
    setLocationId,
    setPlace,
    setTransport,
    setAccommodation,
    setPeople,
    setDays
  } = useTrip();

  // ?place=slug from a Plan Trip link — pre-select the matching destination
  // once places data arrives. Keep the slug in a ref so the auto-select
  // effect only fires once per ?place value (don't override manual changes).
  const [searchParams] = useSearchParams();
  const requestedPlaceSlug = searchParams.get('place');
  const appliedSlugRef = useRef(null);

  // 422 errors come back keyed by API field name (location_id, place_id, etc.)
  // — map them to the form's camelCase keys for inline display.
  const fieldErrors = costEstimate.fieldErrors || {};
  const errorFor = (apiField) => fieldErrors[apiField]?.[0];

  // Local form state for the number inputs — synced into context on change.
  const [peopleInput, setPeopleInput] = useState(String(tripData.people || 1));
  const [daysInput, setDaysInput] = useState(String(tripData.days || 1));

  // Fetch all reference data in parallel (Promise.all).
  const {
    data: locations,
    loading: locLoading,
    error: locError
  } = useApiRequest(
    () =>
      Promise.all([
        getLocations(),
        getTransports(),
        getAccommodations(),
        getAllPlaces()
      ]).then(([locs, trans, accs, places]) => ({
        locations: locs,
        transports: trans,
        accommodations: accs,
        places
      })),
    []
  );

  const loading = locLoading;
  const error = locError;

  // Seed local number inputs from context when it changes (e.g. on Reset).
  useEffect(() => {
    setPeopleInput(String(tripData.people || 1));
    setDaysInput(String(tripData.days || 1));
  }, [tripData.people, tripData.days]);

  // Auto-select the place from ?place=slug once the places list arrives.
  // Fires exactly once per requested slug so it doesn't override a manual
  // destination change.
  useEffect(() => {
    if (!requestedPlaceSlug) return;
    if (appliedSlugRef.current === requestedPlaceSlug) return;
    const places = locations?.places || [];
    if (places.length === 0) return;
    const match = places.find((p) => p.slug === requestedPlaceSlug);
    if (match) {
      setPlace(match);
      appliedSlugRef.current = requestedPlaceSlug;
    }
  }, [requestedPlaceSlug, locations, setPlace]);

  const handleLocationChange = (e) => {
    setLocationId(e.target.value ? parseInt(e.target.value, 10) : null);
  };

  const handlePlaceChange = (e) => {
    const id = e.target.value ? parseInt(e.target.value, 10) : null;
    const place = id
      ? (locations?.places || []).find((p) => p.id === id) || null
      : null;
    setPlace(place);
  };

  const handleTransportClick = (transport) => {
    setTransport(transport);
  };

  const handleAccommodationClick = (accommodation) => {
    setAccommodation(accommodation);
  };

  const handlePeopleChange = (e) => {
    const v = e.target.value;
    setPeopleInput(v);
    setPeople(v);
  };

  const handleDaysChange = (e) => {
    const v = e.target.value;
    setDaysInput(v);
    setDays(v);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-base-200 rounded-2xl p-6 animate-pulse">
            <div className="h-6 w-40 bg-base-300 rounded mb-4"></div>
            <div className="h-10 w-full bg-base-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Couldn't load planner data from the server."
        retry={() => window.location.reload()}
      />
    );
  }

  const { places, transports, accommodations } = locations;

  return (
    <div className="space-y-6">
      {/* Starting Location */}
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>🏠</span> Starting Location
        </h3>
        <select
          value={tripData.locationId ?? ''}
          onChange={handleLocationChange}
          className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors text-base-content"
        >
          <option value="">Choose where you're starting from...</option>
          {(locations.locations || []).map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        {errorFor('location_id') && (
          <p className="mt-2 text-error text-xs">{errorFor('location_id')}</p>
        )}
      </div>

      {/* Destination Selection */}
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>📍</span> Select Destination
        </h3>
        <select
          value={tripData.placeId ?? ''}
          onChange={handlePlaceChange}
          className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors text-base-content"
        >
          <option value="">Choose a destination...</option>
          {(places || []).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {errorFor('place_id') && (
          <p className="mt-2 text-error text-xs">{errorFor('place_id')}</p>
        )}
        {tripData.selectedPlace && (
          <div className="mt-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm text-base-content/80">
              <span className="font-medium">Selected:</span>{' '}
              {tripData.selectedPlace.name}
            </p>
          </div>
        )}
      </div>

      {/* Transportation */}
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>🚌</span> Transportation
        </h3>
        <div className="flex flex-wrap gap-2">
          {(transports || []).map((t) => {
            const selected = tripData.transportId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTransportClick(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selected
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'bg-base-100 text-base-content/70 hover:bg-base-300'
                }`}
              >
                {transportIcon[t.icon] || '🚌'} {t.name}
              </button>
            );
          })}
        </div>
        {errorFor('transport_id') && (
          <p className="mt-2 text-error text-xs">{errorFor('transport_id')}</p>
        )}
      </div>

      {/* Accommodation */}
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>🏨</span> Accommodation
        </h3>
        <div className="flex flex-wrap gap-2">
          {(accommodations || []).map((a) => {
            const selected = tripData.accommodationId === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleAccommodationClick(a)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selected
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'bg-base-100 text-base-content/70 hover:bg-base-300'
                }`}
              >
                {a.star_rating ? '⭐'.repeat(a.star_rating) + ' ' : ''}
                {a.name}
              </button>
            );
          })}
        </div>
        {errorFor('accommodation_id') && (
          <p className="mt-2 text-error text-xs">{errorFor('accommodation_id')}</p>
        )}
      </div>

      {/* People + Days */}
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>👥</span> Trip Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-base-content/60 text-sm font-medium block mb-1.5">
              Number of people
            </label>
            <input
              type="number"
              min="1"
              value={peopleInput}
              onChange={handlePeopleChange}
              className="w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors text-base-content"
            />
            {errorFor('people') && (
              <p className="mt-1 text-error text-xs">{errorFor('people')}</p>
            )}
          </div>
          <div>
            <label className="text-base-content/60 text-sm font-medium block mb-1.5">
              Number of days
            </label>
            <input
              type="number"
              min="1"
              value={daysInput}
              onChange={handleDaysChange}
              className="w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-primary transition-colors text-base-content"
            />
            {errorFor('days') && (
              <p className="mt-1 text-error text-xs">{errorFor('days')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { saveTripPlan } from '../../api.js';
import Button from '../common/Button';

const formatTaka = (n) => `৳${(Number(n) || 0).toLocaleString()}`;

const TripSummary = () => {
  const navigate = useNavigate();
  const {
    tripData,
    costEstimate,
    allFieldsFilled,
    resetTrip
  } = useTrip();
  const {
    placeId,
    selectedPlace,
    selectedTransport,
    selectedAccommodation,
    locationId,
    transportId,
    accommodationId,
    people,
    days
  } = tripData;

  const { data, loading, error, routeMissing } = costEstimate;

  // Save flow — independent of the live cost calculation. Once the user
  // clicks Save we POST to /trip-plans, show a brief loading state on the
  // button, then either link to /trips/{id} (Phase 8) or surface the error.
  const [saveState, setSaveState] = useState({
    status: 'idle', // 'idle' | 'saving' | 'success' | 'error'
    error: null,
    savedTrip: null
  });

  const handleSave = async () => {
    if (!allFieldsFilled) return;
    setSaveState({ status: 'saving', error: null, savedTrip: null });

    try {
      const result = await saveTripPlan({
        location_id: locationId,
        place_id: placeId,
        transport_id: transportId,
        accommodation_id: accommodationId,
        people,
        days
      });
      setSaveState({
        status: 'success',
        error: null,
        savedTrip: result
      });
      // Auto-navigate to the saved-trip page so the user sees the result.
      navigate(`/trips/${result.id}`);
    } catch (err) {
      // Prefer the backend's validation message, fall back to the generic one.
      const message =
        err.body?.message ||
        err.message ||
        'Could not save the trip. Please try again.';
      setSaveState({
        status: 'error',
        error: message,
        savedTrip: null
      });
    }
  };

  const handleReset = () => {
    resetTrip();
    setSaveState({ status: 'idle', error: null, savedTrip: null });
  };

  // Empty state — at minimum, a destination must be picked.
  if (!placeId) {
    return (
      <div className="bg-base-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-base-content font-bold text-lg mb-2">
          No Trip Planned
        </h3>
        <p className="text-base-content/60 text-sm">
          Select a starting location and a destination to see your trip summary.
        </p>
      </div>
    );
  }

  const transportCost = data?.transport_cost ?? 0;
  const accommodationCost = data?.accommodation_cost ?? 0;
  const totalCost = data?.total_cost ?? 0;
  const distanceKm = data?.distance_km ?? 0;

  const saving = saveState.status === 'saving';
  const canSave = allFieldsFilled && !saving;

  return (
    <div className="bg-base-200 rounded-2xl p-6">
      <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
        <span>📋</span> Trip Summary
      </h3>

      <div className="space-y-4">
        {/* Destination */}
        <div className="p-4 bg-base-100 rounded-xl">
          <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1">
            Destination
          </p>
          <h4 className="text-base-content font-bold text-lg">
            {selectedPlace?.name || 'Selected'}
          </h4>
          {selectedPlace?.description && (
            <p className="text-base-content/60 text-sm mt-1 line-clamp-2">
              {selectedPlace.description}
            </p>
          )}
        </div>

        {/* Transport */}
        <div className="p-4 bg-base-100 rounded-xl">
          <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1">
            Transportation
          </p>
          <div className="flex items-center justify-between">
            <span className="text-base-content font-medium">
              {selectedTransport?.name || 'Not selected'}
            </span>
            <span className="text-base-content font-bold">
              {loading ? '…' : formatTaka(transportCost)}
            </span>
          </div>
        </div>

        {/* Accommodation */}
        <div className="p-4 bg-base-100 rounded-xl">
          <p className="text-base-content/40 text-xs uppercase tracking-wider mb-1">
            Accommodation
          </p>
          <div className="flex items-center justify-between">
            <span className="text-base-content font-medium">
              {selectedAccommodation?.name || 'Not selected'}
            </span>
            <span className="text-base-content font-bold">
              {loading ? '…' : formatTaka(accommodationCost)}
            </span>
          </div>
        </div>

        {/* People + Days */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-base-100 rounded-xl text-center">
            <p className="text-base-content/40 text-xs uppercase tracking-wider">
              People
            </p>
            <p className="text-base-content font-black text-xl">{people}</p>
          </div>
          <div className="p-4 bg-base-100 rounded-xl text-center">
            <p className="text-base-content/40 text-xs uppercase tracking-wider">
              Days
            </p>
            <p className="text-base-content font-black text-xl">{days}</p>
          </div>
        </div>

        {/* Distance */}
        {distanceKm > 0 && (
          <div className="text-center text-base-content/60 text-xs">
            📏 Estimated distance: {distanceKm} km
          </div>
        )}

        {/* Route-not-found message */}
        {routeMissing && (
          <div className="alert alert-warning text-sm py-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Total */}
        <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-base-content font-bold text-lg">Total Cost</span>
            <span className="text-primary font-black text-2xl">
              {loading ? '…' : formatTaka(totalCost)}
            </span>
          </div>
          <p className="text-base-content/60 text-xs mt-1">
            Includes transport and accommodation
          </p>
        </div>

        {/* Generic error from cost calculation */}
        {error && !routeMissing && (
          <div className="alert alert-error text-sm py-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Save feedback — success flashes briefly before navigate() moves on. */}
        {saveState.status === 'success' && saveState.savedTrip && (
          <div className="alert alert-success text-sm py-2">
            <span>✅</span>
            <span>
              Trip saved! Opening trip #{saveState.savedTrip.id}…
            </span>
          </div>
        )}

        {saveState.status === 'error' && (
          <div className="alert alert-error text-sm py-2">
            <span>⚠️</span>
            <span>{saveState.error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="gradient"
            size="md"
            fullWidth
            loading={saving}
            disabled={!canSave}
            onClick={handleSave}
          >
            💾 Save Trip
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleReset}
            disabled={saving}
          >
            🔄 Reset
          </Button>
        </div>

        {!allFieldsFilled && (
          <p className="text-base-content/50 text-xs text-center">
            Fill in all trip details above to enable Save.
          </p>
        )}
      </div>
    </div>
  );
};

export default TripSummary;
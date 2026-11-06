import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { calculateTrip } from '../api.js';

// Create the context
const TripContext = createContext();

// Initial state — shape matches what /trip-plan/calculate and /trip-plans
// expect: location_id, place_id, transport_id, accommodation_id, people, days.
// Plus display helpers so TripSummary/BudgetCard can show names without
// re-fetching what TripForm already loaded.
const initialState = {
  // Canonical IDs (POSTed to /trip-plan/calculate)
  locationId: null,
  placeId: null,
  transportId: null,
  accommodationId: null,
  people: 1,
  days: 1,

  // Display helpers — full objects so summary cards can show names.
  // These don't get sent to the API.
  selectedPlace: null,
  selectedTransport: null,
  selectedAccommodation: null,

  // Legacy fields kept so existing imports still resolve. Real cost display
  // is wired via `costEstimate` below.
  showBudget: true,
  totalBudget: 0
};

// How long to wait after the last input change before calling the API.
// 400ms keeps the UI responsive without thrashing the backend.
const CALC_DEBOUNCE_MS = 400;

// Provider component
export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(initialState);

  // Live cost estimate from POST /trip-plan/calculate.
  // shape: { data, loading, error, routeMissing, fieldErrors }
  //   data: { distance_km, transport_cost, accommodation_cost, total_cost } on success
  //   routeMissing: true when backend returns 404 (no seeded route)
  //   fieldErrors: { fieldName: [msg, ...] } when backend returns 422
  const [costEstimate, setCostEstimate] = useState({
    data: null,
    loading: false,
    error: null,
    routeMissing: false,
    fieldErrors: null
  });

  // Stable ref for the cost state so the debounced effect can clear stale
  // results without re-creating the timer on every render.
  const costEstimateRef = useRef(costEstimate);
  costEstimateRef.current = costEstimate;

  const setLocationId = (id) =>
    setTripData((prev) => ({ ...prev, locationId: id }));

  const setPlace = (place) =>
    setTripData((prev) => ({
      ...prev,
      placeId: place ? place.id : null,
      selectedPlace: place || null
    }));

  const setTransport = (transport) =>
    setTripData((prev) => ({
      ...prev,
      transportId: transport ? transport.id : null,
      selectedTransport: transport || null
    }));

  const setAccommodation = (accommodation) =>
    setTripData((prev) => ({
      ...prev,
      accommodationId: accommodation ? accommodation.id : null,
      selectedAccommodation: accommodation || null
    }));

  const setPeople = (n) =>
    setTripData((prev) => ({
      ...prev,
      people: Math.max(1, parseInt(n, 10) || 1)
    }));

  const setDays = (n) =>
    setTripData((prev) => ({
      ...prev,
      days: Math.max(1, parseInt(n, 10) || 1)
    }));

  const toggleBudgetVisibility = () => {
    setTripData((prev) => ({ ...prev, showBudget: !prev.showBudget }));
  };

  // True only when every field the API requires is present.
  const allFieldsFilled = useMemo(() => {
    return (
      tripData.locationId !== null &&
      tripData.placeId !== null &&
      tripData.transportId !== null &&
      tripData.accommodationId !== null &&
      tripData.people >= 1 &&
      tripData.days >= 1
    );
  }, [
    tripData.locationId,
    tripData.placeId,
    tripData.transportId,
    tripData.accommodationId,
    tripData.people,
    tripData.days
  ]);

  // Debounced live calculation. Fires 400ms after the last input change.
  useEffect(() => {
    if (!allFieldsFilled) {
      // Clear any previous estimate when the user starts over.
      setCostEstimate({
        data: null,
        loading: false,
        error: null,
        routeMissing: false,
        fieldErrors: null
      });
      return;
    }

    const timer = setTimeout(async () => {
      setCostEstimate((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await calculateTrip({
          location_id: tripData.locationId,
          place_id: tripData.placeId,
          transport_id: tripData.transportId,
          accommodation_id: tripData.accommodationId,
          people: tripData.people,
          days: tripData.days
        });
        setCostEstimate({
          data: result,
          loading: false,
          error: null,
          routeMissing: false,
          fieldErrors: null
        });
      } catch (err) {
        // 404 = no seeded route for this location+place pair
        if (err.status === 404) {
          setCostEstimate({
            data: null,
            loading: false,
            error: err.body?.message || 'No route found for this location and place.',
            routeMissing: true,
            fieldErrors: null
          });
        }
        // 422 = validation — surface the field errors
        else if (err.status === 422 && err.body?.errors) {
          setCostEstimate({
            data: null,
            loading: false,
            error: err.body.message || 'Validation failed.',
            routeMissing: false,
            fieldErrors: err.body.errors
          });
        }
        // Other errors (network, 500, etc.)
        else {
          setCostEstimate({
            data: null,
            loading: false,
            error: err.message || 'Could not calculate trip cost.',
            routeMissing: false,
            fieldErrors: null
          });
        }
      }
    }, CALC_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [
    allFieldsFilled,
    tripData.locationId,
    tripData.placeId,
    tripData.transportId,
    tripData.accommodationId,
    tripData.people,
    tripData.days
  ]);

  const resetTrip = () => {
    setTripData(initialState);
    setCostEstimate({
      data: null,
      loading: false,
      error: null,
      routeMissing: false,
      fieldErrors: null
    });
  };

  // Legacy stub kept so existing imports don't blow up.
  const calculateTotalBudget = useMemo(
    () => costEstimate.data?.total_cost ?? 0,
    [costEstimate.data]
  );

  const updateTotalBudget = () => {
    // No-op; costEstimate drives the total now.
  };

  const value = {
    tripData,
    costEstimate,
    allFieldsFilled,
    setLocationId,
    setPlace,
    setTransport,
    setAccommodation,
    setPeople,
    setDays,
    toggleBudgetVisibility,
    resetTrip,
    calculateTotalBudget,
    updateTotalBudget
  };

  return (
    <TripContext.Provider value={value}>{children}</TripContext.Provider>
  );
};

// Custom hook for using the context
export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export default TripContext;
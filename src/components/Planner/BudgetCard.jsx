import React from 'react';
import { useTrip } from '../../context/TripContext';

const formatTaka = (n) => `৳${(Number(n) || 0).toLocaleString()}`;

const BudgetCard = () => {
  const { tripData, costEstimate, allFieldsFilled } = useTrip();
  const { data, loading, error, routeMissing } = costEstimate;

  // Show "fill in everything" state when any of the 6 required fields is
  // missing — matches the phase prompt's "not enough info yet" guidance.
  if (!allFieldsFilled) {
    return (
      <div className="bg-base-200 rounded-2xl p-6">
        <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
          <span>💰</span> Budget Breakdown
        </h3>

        <div className="p-6 text-center bg-base-100 rounded-xl border border-base-300">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-base-content/70 text-sm font-medium">
            Fill in all trip details to see your live cost estimate.
          </p>
          <p className="text-base-content/50 text-xs mt-1">
            Required: starting location, destination, transport, accommodation, people, days.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-base-100 rounded-lg">
            <span className="text-base-content/50">People:</span>{' '}
            <span className="text-base-content font-semibold">{tripData.people}</span>
          </div>
          <div className="p-2 bg-base-100 rounded-lg">
            <span className="text-base-content/50">Days:</span>{' '}
            <span className="text-base-content font-semibold">{tripData.days}</span>
          </div>
        </div>
      </div>
    );
  }

  const transportCost = data?.transport_cost ?? 0;
  const accommodationCost = data?.accommodation_cost ?? 0;
  const totalCost = data?.total_cost ?? 0;
  const distanceKm = data?.distance_km ?? 0;

  const items = [
    {
      label: 'Transportation',
      value: transportCost,
      icon: '🚌',
      color: 'bg-secondary/20 text-secondary'
    },
    {
      label: 'Accommodation',
      value: accommodationCost,
      icon: '🏨',
      color: 'bg-accent/20 text-accent'
    }
  ];

  const filledCount = items.filter((i) => i.value > 0).length;

  return (
    <div className="bg-base-200 rounded-2xl p-6">
      <h3 className="text-base-content font-bold text-lg mb-4 flex items-center gap-2">
        <span>💰</span> Budget Breakdown
      </h3>

      {/* Route-not-found message — shown inline near destination/location. */}
      {routeMissing && (
        <div className="alert alert-warning mb-4 text-sm py-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-3 bg-base-100 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-lg`}
              >
                {item.icon}
              </div>
              <span className="text-base-content/80 text-sm font-medium">
                {item.label}
              </span>
            </div>
            <span className="text-base-content font-bold text-sm">
              {loading ? '…' : formatTaka(item.value)}
            </span>
          </div>
        ))}

        {/* Distance */}
        <div className="flex items-center justify-between p-3 bg-base-100/60 rounded-xl border border-dashed border-base-300">
          <span className="text-base-content/60 text-sm">Distance</span>
          <span className="text-base-content/70 text-sm font-medium">
            {loading ? '…' : `${distanceKm} km`}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-lg">
              🎯
            </div>
            <span className="text-base-content font-bold text-base">
              Total Budget
            </span>
          </div>
          <span className="text-primary font-black text-xl">
            {loading ? '…' : formatTaka(totalCost)}
          </span>
        </div>

        {/* Generic error (anything other than 404/422) */}
        {error && !routeMissing && (
          <div className="alert alert-error text-sm py-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="p-3 bg-base-100 rounded-xl text-center">
            <p className="text-base-content/40 text-xs uppercase tracking-wider">
              Items
            </p>
            <p className="text-base-content font-bold text-lg">{filledCount}</p>
          </div>
          <div className="p-3 bg-base-100 rounded-xl text-center">
            <p className="text-base-content/40 text-xs uppercase tracking-wider">
              Per person
            </p>
            <p className="text-base-content font-bold text-lg">
              {loading
                ? '…'
                : formatTaka(
                    tripData.people > 0
                      ? Math.round(totalCost / tripData.people)
                      : 0
                  )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
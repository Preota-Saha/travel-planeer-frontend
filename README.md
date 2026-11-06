# Bangladesh Travel Planner — Frontend

A React + Vite + Tailwind + DaisyUI single-page app that lets travelers
discover destinations across Bangladesh, estimate a trip budget in BDT,
and save the plan to view later.

All data is loaded from the Laravel backend (`/api/...`). There is **no
mock data** in this repo — every list, image, and cost comes from the
backend at runtime.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3 + DaisyUI 5
- React Router 7 (`createBrowserRouter`)
- Native `fetch()` via `src/api.js` (no axios, no React Query)
- Context API for trip-planner state (no Redux/Zustand)

## Prerequisites

- Node.js 18+
- The backend Laravel project at `C:\xampp\htdocs\travel-planner` (or
  wherever you've cloned it) running on `http://127.0.0.1:8000`.
- XAMPP MySQL started (the backend reads from MySQL).

## Running both servers

### 1. Backend (Laravel)

```bash
# Start MySQL via XAMPP first, then:
cd C:\xampp\htdocs\travel-planner
php artisan serve
```

That serves the API at `http://127.0.0.1:8000/api`.

### 2. Frontend (this repo)

Create `.env.local` in the project root if it doesn't exist:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Then:

```bash
npm install
npm run dev
```

That serves the SPA at `http://localhost:5173`.

Open `http://localhost:5173` in your browser. The Vite dev server
proxies nothing — it talks directly to `127.0.0.1:8000`, so make sure
CORS is allowed on the Laravel side.

## Project structure

```
src/
├── api.js                       # fetch() wrapper + endpoint helpers
├── hooks/useApiRequest.js       # { data, loading, error, refetch }
├── context/TripContext.jsx      # planner state + debounced calc
├── components/
│   ├── common/                  # Button, ErrorMessage, Footer
│   ├── Hero.jsx                 # home hero, CTA → /destination
│   ├── Navbar.jsx               # theme switcher + links
│   ├── ThemeSwitcher.jsx
│   ├── Home/                    # PopularDestinations, Features, CTA
│   └── Planner/                 # TripForm, BudgetCard, TripSummary
├── pages/
│   ├── Home.jsx
│   ├── Destination.jsx          # category tabs + place grid
│   ├── PlaceDetails.jsx         # /destination/:slug
│   ├── TripPlanner.jsx          # /tripplanner
│   ├── TripPlanView.jsx         # /trips/:id
│   ├── AboutUs.jsx
│   └── NotFound.jsx
└── routes/Router.jsx
```

## Click-through happy path

1. `/` — Home. Hero "PLAN YOUR TRIP" CTA navigates to `/destination`.
2. `/destination` — Tabs filter by category; cards show real places from
   the API. "Plan Trip" → `/tripplanner?place={slug}`.
3. `/destination/{slug}` — Full place page. "Plan a trip here" → same
   planner with the destination pre-selected.
4. `/tripplanner?place={slug}` — Destination is already picked. Fill
   in location, transport, accommodation, people, days. Live cost
   estimate updates 400 ms after the last change.
5. Click "Save Trip" → POST `/trip-plans` → auto-navigate to
   `/trips/{id}` to view the saved plan.

## Notes

- `destinations.json` and the old mock arrays (Cox's Bazar, Sundarbans,
  Sajek Valley, Bandarban, etc.) were removed in Phase 10. All
  destination/transport/accommodation data now comes from the API.
- `framer-motion` was also removed — all animations use Tailwind
  classes.

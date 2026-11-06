import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Home from '../pages/Home.jsx';
import Destination from '../pages/Destination.jsx';
import PlaceDetails from '../pages/PlaceDetails.jsx';
import TripPlanner from '../pages/TripPlanner.jsx';
import TripPlanView from '../pages/TripPlanView.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import NotFound from '../pages/NotFound.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'destination',
        element: <Destination />
      },
      {
        path: 'destination/:slug',
        element: <PlaceDetails />
      },
      {
        path: 'tripplanner',
        element: <TripPlanner />
      },
      {
        path: 'trips/:id',
        element: <TripPlanView />
      },
      {
        path: 'aboutus',
        element: <AboutUs />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default Router;
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router.jsx';

function App() {
  return (
    <div className="min-h-screen">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
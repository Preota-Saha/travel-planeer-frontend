import React from 'react';
import Button from './Button';

// DaisyUI alert styling.
// Props:
//   message: string shown to the user
//   retry: optional () => void — if provided, a Retry button is shown
const ErrorMessage = ({ message = 'Something went wrong.', retry = null }) => {
  return (
    <div className="alert alert-error flex flex-col items-start sm:flex-row sm:items-center gap-4 my-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          ⚠️
        </span>
        <div>
          <h3 className="font-bold text-base">Error</h3>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>

      {retry && (
        <div className="sm:ml-auto">
          <Button variant="outline" size="sm" onClick={retry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
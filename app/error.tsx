'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="prestige-card p-12 max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-display italic text-white">System Error</h2>
          <p className="text-white/40 text-sm font-light">
            An unexpected error occurred in the Eleva system.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="prestige-button-primary w-full"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}

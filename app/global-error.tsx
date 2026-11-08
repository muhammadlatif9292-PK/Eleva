'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#050505] text-white flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-display italic">Critical System Failure</h2>
          <p className="text-white/40">The Eleva core encountered a fatal error.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-[#F5C518] text-[#050505] font-bold rounded"
          >
            REBOOT SYSTEM
          </button>
        </div>
      </body>
    </html>
  );
}

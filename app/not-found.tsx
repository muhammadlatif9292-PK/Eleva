import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="prestige-card p-12 max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-display italic text-[#F5C518]">404</h1>
          <h2 className="text-2xl font-display italic text-white">Page Not Found</h2>
          <p className="text-white/40 text-sm font-light">
            The requested resource could not be found in the Eleva system.
          </p>
        </div>
        
        <Link 
          href="/"
          className="prestige-button-primary inline-block w-full"
        >
          RETURN TO DASHBOARD
        </Link>
      </div>
    </div>
  );
}

import React from 'react';

interface DiagramProps {
  id: string;
  className?: string;
}

export const PhysicsDiagrams: React.FC<DiagramProps> = ({ id, className = "" }) => {
  switch (id) {
    case 'convex-lens-ray':
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Principal Axis */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeOpacity="0.2" strokeDasharray="4 4" />
          {/* Lens */}
          <path d="M200 20 C240 60 240 140 200 180 C160 140 160 60 200 20" fill="#1B2CC1" fillOpacity="0.2" stroke="#1B2CC1" strokeWidth="2" />
          {/* Object */}
          <line x1="80" y1="100" x2="80" y2="60" stroke="#F5C518" strokeWidth="3" />
          <path d="M75 65 L80 60 L85 65" stroke="#F5C518" strokeWidth="3" />
          {/* Ray 1: Parallel to Axis */}
          <path d="M80 60 L200 60 L320 140" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
          {/* Ray 2: Through Optical Center */}
          <path d="M80 60 L320 140" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
          {/* Focal Points */}
          <circle cx="140" cy="100" r="3" fill="white" fillOpacity="0.5" />
          <circle cx="260" cy="100" r="3" fill="white" fillOpacity="0.5" />
          <text x="135" y="120" fill="white" fillOpacity="0.3" fontSize="10">F</text>
          <text x="255" y="120" fill="white" fillOpacity="0.3" fontSize="10">F</text>
        </svg>
      );

    case 'logic-and-gate':
      return (
        <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20 H80 C110 20 110 80 80 80 H40 V20Z" stroke="white" strokeWidth="2" />
          <line x1="10" y1="35" x2="40" y2="35" stroke="white" strokeWidth="2" />
          <line x1="10" y1="65" x2="40" y2="65" stroke="white" strokeWidth="2" />
          <line x1="105" y1="50" x2="140" y2="50" stroke="white" strokeWidth="2" />
          <text x="55" y="55" fill="white" fontSize="12" fontWeight="bold">AND</text>
          <text x="0" y="38" fill="white" fillOpacity="0.5" fontSize="10">A</text>
          <text x="0" y="68" fill="white" fillOpacity="0.5" fontSize="10">B</text>
          <text x="145" y="54" fill="white" fillOpacity="0.5" fontSize="10">X</text>
        </svg>
      );

    case 'simple-circuit':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="120" height="90" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
          {/* Battery */}
          <rect x="90" y="115" width="20" height="10" fill="#050505" />
          <line x1="90" y1="120" x2="110" y2="120" stroke="#F5C518" strokeWidth="4" />
          <line x1="95" y1="125" x2="105" y2="125" stroke="#F5C518" strokeWidth="2" />
          {/* Resistor */}
          <path d="M80 30 L85 20 L95 40 L105 20 L115 40 L120 30" stroke="white" strokeWidth="2" />
          <text x="90" y="15" fill="white" fillOpacity="0.5" fontSize="10">R</text>
          <text x="115" y="135" fill="white" fillOpacity="0.5" fontSize="10">V</text>
        </svg>
      );

    default:
      return null;
  }
};

import React from 'react';

interface TableIconProps {
  className?: string;
  size?: number;
}

export const TableIcon: React.FC<TableIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Chair */}
      {/* Chair Backrest */}
      <rect x="10" y="10" width="4" height="24" rx="2" fill="#3E2723" stroke="#212121" strokeWidth="1.5" />
      {/* Chair Seat */}
      <rect x="8" y="26" width="16" height="4" rx="2" fill="#E65100" stroke="#212121" strokeWidth="1.5" />
      {/* Chair Legs */}
      <line x1="12" y1="30" x2="10" y2="48" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="30" x2="22" y2="48" stroke="#212121" strokeWidth="2" strokeLinecap="round" />

      {/* Right Chair */}
      {/* Chair Backrest */}
      <rect x="66" y="10" width="4" height="24" rx="2" fill="#3E2723" stroke="#212121" strokeWidth="1.5" />
      {/* Chair Seat */}
      <rect x="56" y="26" width="16" height="4" rx="2" fill="#E65100" stroke="#212121" strokeWidth="1.5" />
      {/* Chair Legs */}
      <line x1="60" y1="30" x2="58" y2="48" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="30" x2="70" y2="48" stroke="#212121" strokeWidth="2" strokeLinecap="round" />

      {/* Center Table */}
      {/* Table cloth top */}
      <rect x="23" y="18" width="34" height="6" rx="2" fill="#80DEEA" stroke="#212121" strokeWidth="1.8" />
      {/* Drooping tablecloth edges */}
      <path
        d="M24 24V28C24 29.5 25.5 30 27 30C28.5 30 30 29 30 27V24H50V27C50 29 51.5 30 53 30C54.5 30 56 29.5 56 28V24H24Z"
        fill="#B2EBF2"
        stroke="#212121"
        strokeWidth="1.5"
      />
      {/* Table legs & Pedestal */}
      <line x1="33" y1="28" x2="33" y2="46" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="47" y1="28" x2="47" y2="46" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
      {/* Table feet base crossbar */}
      <path d="M29 46H51" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="46" r="2" fill="#212121" />
    </svg>
  );
};

import React from 'react';

interface CategoryIconProps {
  type: 'bebidas' | 'diversos' | 'frios' | 'hamburguer' | 'pizza' | 'porcoes' | 'salgados' | 'espetinhos' | string;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ type, size = 44, className = '' }) => {
  switch (type) {
    case 'espetinhos':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Wooden skewer stick */}
          <line x1="10" y1="54" x2="54" y2="10" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
          <line x1="8" y1="56" x2="16" y2="48" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          {/* Meat Cube 1 */}
          <rect x="14" y="38" width="13" height="13" rx="3" transform="rotate(-45 14 38)" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2" />
          <rect x="18" y="40" width="8" height="8" rx="2" transform="rotate(-45 18 40)" fill="#991B1B" />
          {/* Onion slice */}
          <rect x="25" y="27" width="9" height="9" rx="2" transform="rotate(-45 25 27)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Meat Cube 2 */}
          <rect x="28" y="24" width="14" height="14" rx="3" transform="rotate(-45 28 24)" fill="#991B1B" stroke="#450A0A" strokeWidth="2" />
          <path d="M 32 16 L 38 22" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
          {/* Bell pepper */}
          <rect x="39" y="13" width="9" height="9" rx="2" transform="rotate(-45 39 13)" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
          {/* Meat Cube 3 */}
          <rect x="42" y="10" width="12" height="12" rx="3" transform="rotate(-45 42 10)" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2" />
        </svg>
      );

    case 'bebidas':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Left Wine Bottle */}
          <rect x="16" y="22" width="10" height="26" rx="2" fill="#15803D" stroke="#1F2937" strokeWidth="2" />
          <path d="M19 22V14H23V22" fill="#15803D" stroke="#1F2937" strokeWidth="1.8" />
          <rect x="18" y="28" width="6" height="10" fill="#FEF08A" />
          {/* Center Tall Bottle */}
          <rect x="27" y="18" width="11" height="30" rx="2" fill="#B91C1C" stroke="#1F2937" strokeWidth="2" />
          <path d="M30 18V10H35V18" fill="#B91C1C" stroke="#1F2937" strokeWidth="1.8" />
          <rect x="29" y="25" width="7" height="12" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1" />
          <line x1="30" y1="31" x2="35" y2="31" stroke="#EF4444" strokeWidth="2" />
          {/* Right Soda Can / Bottle */}
          <rect x="39" y="24" width="9" height="24" rx="2" fill="#F59E0B" stroke="#1F2937" strokeWidth="2" />
          <path d="M42 24V17H45V24" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.8" />
          <circle cx="43.5" cy="34" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'diversos':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Fortune cookie / snack */}
          <path
            d="M18 42C12 36 14 24 24 18C34 12 46 16 50 24C54 32 48 42 38 46C30 50 22 46 18 42Z"
            fill="#FBBF24"
            stroke="#1F2937"
            strokeWidth="2"
          />
          <path
            d="M20 38C26 34 32 30 40 34C48 38 44 46 36 44C28 42 24 40 20 38Z"
            fill="#F59E0B"
            stroke="#1F2937"
            strokeWidth="1.8"
          />
          {/* Paper message sticking out */}
          <path d="M12 40L22 36L20 31L10 35L12 40Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.5" />
        </svg>
      );

    case 'frios':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Cheese slice wedge */}
          <path
            d="M12 42L48 44L52 28L18 20L12 42Z"
            fill="#FBBF24"
            stroke="#1F2937"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M18 20L52 28L40 14L18 20Z"
            fill="#FDE047"
            stroke="#1F2937"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Cheese holes */}
          <circle cx="26" cy="34" r="3.5" fill="#D97706" />
          <circle cx="38" cy="36" r="4.5" fill="#D97706" />
          <circle cx="44" cy="30" r="2.5" fill="#D97706" />
          <circle cx="32" cy="22" r="2" fill="#CA8A04" />
        </svg>
      );

    case 'hamburguer':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Top Bun */}
          <path
            d="M14 26C14 18 22 14 32 14C42 14 50 18 50 26C50 27 49 28 48 28H16C15 28 14 27 14 26Z"
            fill="#F59E0B"
            stroke="#1F2937"
            strokeWidth="2"
          />
          {/* Sesame seeds */}
          <circle cx="24" cy="20" r="1.2" fill="#FEF3C7" />
          <circle cx="32" cy="18" r="1.2" fill="#FEF3C7" />
          <circle cx="40" cy="21" r="1.2" fill="#FEF3C7" />
          {/* Dripping ketchup / sauce & melted cheese */}
          <path
            d="M15 28C15 32 18 34 20 31C22 28 25 34 27 32C29 30 32 35 35 32C38 29 41 35 44 31C47 27 49 32 49 28H15Z"
            fill="#EF4444"
            stroke="#1F2937"
            strokeWidth="1.5"
          />
          {/* Cheese */}
          <polygon points="16,33 48,33 46,38 32,41 18,37" fill="#FACC15" stroke="#1F2937" strokeWidth="1.5" />
          {/* Meat Patty */}
          <rect x="14" y="37" width="36" height="7" rx="3.5" fill="#78350F" stroke="#1F2937" strokeWidth="2" />
          {/* Bottom Bun */}
          <path
            d="M16 44H48C49 44 50 45 49 47C48 50 41 52 32 52C23 52 16 50 15 47C14 45 15 44 16 44Z"
            fill="#F59E0B"
            stroke="#1F2937"
            strokeWidth="2"
          />
        </svg>
      );

    case 'pizza':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Crust */}
          <path
            d="M16 18C26 12 38 12 48 18C49 19 49 20 48 21L33 50C32.5 51 31.5 51 31 50L16 21C15 20 15 19 16 18Z"
            fill="#FBBF24"
            stroke="#1F2937"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Crust border */}
          <path
            d="M16 18C26 13 38 13 48 18"
            stroke="#B45309"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Pepperoni slices */}
          <circle cx="28" cy="27" r="3.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
          <circle cx="37" cy="29" r="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
          <circle cx="32" cy="38" r="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
          {/* Herbs */}
          <circle cx="24" cy="22" r="1" fill="#15803D" />
          <circle cx="33" cy="24" r="1" fill="#15803D" />
          <circle cx="39" cy="37" r="1" fill="#15803D" />
        </svg>
      );

    case 'porcoes':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Red Box Carton */}
          <path
            d="M18 28L21 50C21.5 52 23 53 25 53H39C41 53 42.5 52 43 50L46 28C41 31 35 31 32 29C29 31 23 31 18 28Z"
            fill="#DC2626"
            stroke="#1F2937"
            strokeWidth="2"
          />
          {/* Golden French Fries sticking out */}
          <rect x="23" y="14" width="4" height="20" rx="1.5" fill="#FBBF24" stroke="#1F2937" strokeWidth="1.5" transform="rotate(-8 23 14)" />
          <rect x="29" y="10" width="4.5" height="24" rx="1.5" fill="#FDE047" stroke="#1F2937" strokeWidth="1.5" />
          <rect x="36" y="12" width="4" height="22" rx="1.5" fill="#FBBF24" stroke="#1F2937" strokeWidth="1.5" transform="rotate(7 36 12)" />
          <rect x="19" y="18" width="3.5" height="16" rx="1.5" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" transform="rotate(-15 19 18)" />
          <rect x="42" y="16" width="3.5" height="18" rx="1.5" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" transform="rotate(12 42 16)" />
          {/* Logo badge on fries carton */}
          <circle cx="32" cy="41" r="5" fill="#FEF08A" stroke="#1F2937" strokeWidth="1.2" />
        </svg>
      );

    case 'salgados':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Croissant / Pastel / Salgado */}
          <path
            d="M14 40C12 30 18 20 28 17C38 14 48 20 50 30C52 40 44 45 38 43C32 41 24 43 18 45C16 45 14 42 14 40Z"
            fill="#F59E0B"
            stroke="#1F2937"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Pastry folds */}
          <path d="M22 28C26 23 32 23 36 29" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 35C32 30 38 31 42 37" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="22" fill="#E0E7FF" stroke="#4338CA" strokeWidth="2" />
          <path d="M24 32H40M32 24V40" stroke="#4338CA" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};

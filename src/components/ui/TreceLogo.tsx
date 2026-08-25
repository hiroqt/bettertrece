import React from 'react';

interface TreceLogoProps {
  className?: string;
  isLight?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TreceMonumentEmblem: React.FC<{
  className?: string;
  isLight?: boolean;
}> = ({ className = 'w-11 h-11', isLight = false }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 ${
        isLight
          ? 'drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]'
          : 'drop-shadow-xs'
      } ${className}`}
    >
      <img
        src="/logo.svg"
        alt="City of Trece Martires Monument Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export const BetterTreceLogo: React.FC<TreceLogoProps> = ({
  className = '',
  isLight = false,
  showText = true,
  size = 'md',
}) => {
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <TreceMonumentEmblem className={emblemSizes[size]} isLight={isLight} />

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-extrabold ${titleSizes[size]} tracking-tight font-sans transition-colors ${
                isLight ? 'text-white' : 'text-gray-900'
              }`}
            >
              Better
              <span className={isLight ? 'text-amber-300' : 'text-amber-500'}>
                Trece
              </span>
            </span>
            <span
              className={`font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                size === 'sm' ? 'text-[10px]' : 'text-xs'
              } ${
                isLight
                  ? 'text-white bg-white/20 border border-white/20'
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              .org
            </span>
          </div>
          <span
            className={`${subtextSizes[size]} font-semibold tracking-wider uppercase transition-colors ${
              isLight ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            Trece Martires City, Cavite
          </span>
        </div>
      )}
    </div>
  );
};

export default BetterTreceLogo;

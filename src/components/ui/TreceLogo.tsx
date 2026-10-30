import React from 'react';

interface TreceLogoProps {
  className?: string;
  isLight?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BetterTreceLogo: React.FC<TreceLogoProps> = ({
  className = '',
  isLight = false,
  size = 'md',
}) => {
  const sizes = {
    sm: 'w-36',
    md: 'w-48',
    lg: 'w-60',
    xl: 'w-72',
  };

  return (
    <img
      src="/images/better-trece-martires-logo.png"
      alt="Better Trece Martires"
      className={`${sizes[size]} h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${isLight ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
};

export default BetterTreceLogo;

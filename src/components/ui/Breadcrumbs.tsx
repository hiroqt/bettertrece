import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  isDark?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  isDark,
}) => {
  const location = useLocation();

  // Determine if breadcrumbs are on dark hero background
  const isDarkTheme =
    isDark !== undefined
      ? isDark
      : className.includes('text-blue') ||
        className.includes('text-white') ||
        className.includes('text-slate-100');

  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  return (
    <nav
      className={`flex items-center text-xs sm:text-sm max-w-full ${className}`}
      aria-label="Breadcrumb"
    >
      <ol
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 leading-relaxed max-w-full"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-full"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Separator icon (not for first item) */}
              {!isFirst && (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isDarkTheme ? 'text-blue-300/60' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Breadcrumb Content */}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={`inline-flex items-center gap-1 transition-colors duration-150 group rounded hover:underline focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                    isDarkTheme
                      ? 'text-blue-200 hover:text-white font-medium'
                      : 'text-gray-600 hover:text-[#003893] font-medium'
                  }`}
                  itemProp="item"
                >
                  {isFirst && (
                    <Home
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isDarkTheme
                          ? 'text-amber-300 group-hover:text-amber-200'
                          : 'text-[#003893]'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    itemProp="name"
                    className="truncate max-w-[140px] sm:max-w-[200px] md:max-w-none"
                  >
                    {item.label}
                  </span>
                  <meta itemProp="position" content={String(index + 1)} />
                </Link>
              ) : (
                <span
                  className={`inline-flex items-center gap-1 min-w-0 font-bold ${
                    isDarkTheme ? 'text-white drop-shadow-xs' : 'text-gray-900'
                  }`}
                  aria-current="page"
                  itemProp="item"
                >
                  {isFirst && (
                    <Home
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isDarkTheme ? 'text-amber-300' : 'text-[#003893]'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    itemProp="name"
                    title={item.label}
                    className="truncate max-w-[200px] sm:max-w-[320px] md:max-w-none"
                  >
                    {item.label}
                  </span>
                  <meta itemProp="position" content={String(index + 1)} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

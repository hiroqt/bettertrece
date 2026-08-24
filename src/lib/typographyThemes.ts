/**
 * Typography theme configuration for markdown content
 */

export interface TypographyTheme {
  name: string;
  components: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    p?: string;
    small?: string;
    ul?: string;
    ol?: string;
    li?: string;
    'li.ordered'?: string; // Special styling for ordered list items
    blockquote?: string;
    code?: string;
    pre?: string;
    a?: string;
    strong?: string;
    em?: string;
    hr?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  };
}

// Default theme with Tailwind classes
export const defaultTheme: TypographyTheme = {
  name: 'default',
  components: {
    h1: 'text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 mt-2 text-gray-900 tracking-tight',
    h2: 'text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-8 sm:mt-10 text-gray-900 tracking-tight',
    h3: 'text-lg sm:text-xl font-bold text-gray-800 mb-3 mt-6 tracking-tight',
    h4: 'text-base sm:text-lg font-bold text-gray-800 mb-2 mt-4',
    h5: 'text-sm sm:text-base font-bold text-gray-800 mb-2 mt-3',
    h6: 'text-xs sm:text-sm font-bold text-gray-800 mb-2 mt-3 uppercase tracking-wider',
    p: 'text-sm sm:text-base text-gray-700 mb-4 leading-relaxed',
    small: 'text-xs sm:text-sm text-gray-600 mb-3',
    ul: 'list-none mb-6 space-y-2.5 sm:space-y-3 pl-0',
    ol: 'list-none mb-6 space-y-2.5 sm:space-y-3 pl-0',
    li: 'text-sm sm:text-base text-gray-700 leading-relaxed relative pl-5 sm:pl-6 mb-1.5 before:content-["•"] before:absolute before:left-0 before:text-[#003893] before:font-bold before:text-base sm:before:text-lg',
    'li.ordered':
      'text-sm sm:text-base text-gray-700 leading-relaxed relative pl-7 sm:pl-8 mb-1.5 before:content-[counter(list-item)] before:absolute before:left-0 before:text-[#003893] before:font-bold before:text-xs sm:before:text-sm before:counter-increment-[list-item] before:bg-blue-50 before:px-1.5 before:py-0.5 before:rounded-md',
    blockquote:
      'border-l-4 border-[#003893] pl-4 sm:pl-6 py-3 sm:py-4 mb-6 bg-blue-50/80 rounded-r-xl text-gray-700 italic text-sm sm:text-base leading-relaxed',
    code: 'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-gray-200',
    pre: 'bg-gray-900 text-gray-100 p-3.5 sm:p-4 rounded-xl overflow-x-auto mb-6 border font-mono text-xs sm:text-sm leading-relaxed scrollbar-thin',
    a: 'text-[#003893] hover:text-blue-800 underline font-semibold transition-colors duration-200',
    strong: 'font-bold text-gray-900',
    em: 'italic text-gray-700',
    hr: 'border-t border-gray-200 my-6 sm:my-8',
    table:
      'w-full border-collapse border border-gray-200 rounded-xl overflow-hidden min-w-full text-xs sm:text-sm',
    thead: 'bg-gray-50/90 border-b border-gray-200',
    tbody: 'divide-y divide-gray-100',
    tr: 'hover:bg-blue-50/40 transition-colors',
    th: 'text-left py-2.5 px-3 sm:py-3.5 sm:px-5 font-bold text-gray-800 text-xs sm:text-sm',
    td: 'py-2.5 px-3 sm:py-3.5 sm:px-5 text-gray-700 text-xs sm:text-sm',
  },
};

// Available themes
export const typographyThemes: Record<string, TypographyTheme> = {
  default: defaultTheme,
};

/**
 * Get a typography theme by name
 */
export function getTypographyTheme(
  themeName: string = 'default'
): TypographyTheme {
  return typographyThemes[themeName] || defaultTheme;
}

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('i18nextLng', languageCode);
    }
  };

  const currentLang = (i18n.language || 'en').toLowerCase();
  const activeLang =
    languages.find(lang => {
      if (lang.code === 'fil') {
        return currentLang.startsWith('fil') || currentLang.startsWith('tl');
      }
      return currentLang.startsWith('en');
    }) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
        <Globe size={16} />
        <span>{activeLang.flag}</span>
        <span className="hidden sm:inline">{activeLang.name}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map(language => {
            const isSelected =
              language.code === 'fil'
                ? currentLang.startsWith('fil') || currentLang.startsWith('tl')
                : currentLang.startsWith('en');

            return (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-gray-700'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

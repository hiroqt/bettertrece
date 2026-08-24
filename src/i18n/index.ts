import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import fil from './locales/fil.json';

const resources = {
  en: {
    translation: en,
    common: en,
  },
  fil: {
    translation: fil,
    common: fil,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

// Synchronize <html lang="..."> attribute on language change
if (typeof document !== 'undefined') {
  const current = i18n.language || 'en';
  document.documentElement.lang = current.startsWith('fil') ? 'fil' : 'en';

  i18n.on('languageChanged', lng => {
    document.documentElement.lang = lng.startsWith('fil') ? 'fil' : 'en';
  });
}

export default i18n;

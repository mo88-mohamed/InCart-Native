import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// Import translation files
import ar from '../locales/ar.json';
import en from '../locales/en.json';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// Language detection configuration
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string | readonly string[] | undefined) => void) => {
    try {
      // First check if user has a saved language preference
      const savedLanguage = await AsyncStorage.getItem('user-language');

      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        return callback(savedLanguage);
      }

      // Otherwise, try to detect device locale
      try {
        const { getLocales } = require('react-native-localize');
        const locales = getLocales();

        // Check if Arabic is the preferred language
        const isArabic = locales.some((locale: any) => locale.languageCode === 'ar');

        if (isArabic) {
          return callback('ar');
        }
      } catch (localizeError) {
        console.warn('react-native-localize not available, using default language');
      }

      return callback('en');
    } catch (error) {
      console.warn('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.warn('Error caching user language:', error);
    }
  },
} as any;

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,

    // Language detection options
    detection: {
      order: ['languageDetector'],
      caches: ['asyncStorage'],
    },

    // Default language
    fallbackLng: 'en',

    // Disable key separator
    keySeparator: false,

    // Enable interpolation
    interpolation: {
      escapeValue: false,
    },

    // React Native specific options
    react: {
      useSuspense: false,
    },
  });

export default i18n;

// Add RTL support listener
i18n.on('languageChanged', (lng: string) => {
  const isRTL = lng === 'ar';

  // Update I18nManager for RTL layout direction
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    // Note: This requires app restart to take full effect in some cases
    console.log(`RTL set to ${isRTL} for language: ${lng}`);
  }
});

// Set initial RTL based on current language
const currentLanguage = i18n.language || 'en';
const initialRTL = currentLanguage === 'ar';
if (I18nManager.isRTL !== initialRTL) {
  I18nManager.forceRTL(initialRTL);
}

// Utility function to check if current language is RTL
export const checkIsRTL = (): boolean => {
  return i18n.language === 'ar';
};

// Utility function to get text alignment based on RTL
export const getTextAlign = (): 'left' | 'right' => {
  return checkIsRTL() ? 'right' : 'left';
};

console.log('i18n initialized:', i18n.isInitialized);

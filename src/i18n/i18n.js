import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n.use(detector)
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'ru',
        fallbackLng: 'en',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

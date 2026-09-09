'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LOCALES, DEFAULT_LOCALE, getMessages, getCountryCode, localeForCountry } from '@/data/lenguajes';

const LanguageContext = createContext();

function readSaved() {
  try {
    return {
      locale: localStorage.getItem('locale'),
      country: localStorage.getItem('country'),
    };
  } catch {
    return { locale: null, country: null };
  }
}

function persist(locale, country) {
  try {
    localStorage.setItem('locale', locale);
    if (country) localStorage.setItem('country', country);
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // almacenamiento no disponible
  }
  document.documentElement.lang = locale;
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [messages, setMessages] = useState(getMessages(DEFAULT_LOCALE));

  // Al entrar:
  // 1. Si hay idioma guardado Y el país no cambió -> se mantiene (no se toca nada).
  // 2. Si no hay nada guardado, o el país cambió (ej. cambio de VPS) -> se
  //    detecta de nuevo por ubicación y se guarda.
  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = readSaved();
      const country = await getCountryCode();

      if (saved.locale && LOCALES.includes(saved.locale)) {
        if (saved.country && country && saved.country === country) {
          if (alive) {
            setLocaleState(saved.locale);
            setMessages(getMessages(saved.locale));
            document.documentElement.lang = saved.locale;
          }
          return;
        }
        if (!country) {
          // Sin país detectado no se puede saber si cambió: se respeta lo guardado.
          if (alive) {
            setLocaleState(saved.locale);
            setMessages(getMessages(saved.locale));
            document.documentElement.lang = saved.locale;
          }
          return;
        }
      }

      const lng = country ? localeForCountry(country) : DEFAULT_LOCALE;
      if (alive) {
        setLocaleState(lng);
        setMessages(getMessages(lng));
        persist(lng, country);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const setLocale = (lng) => {
    if (!LOCALES.includes(lng)) return;
    const country = (() => {
      try {
        return localStorage.getItem('country') || new URLSearchParams(window.location.search).get('country');
      } catch {
        return null;
      }
    })();
    setLocaleState(lng);
    setMessages(getMessages(lng));
    persist(lng, country);
    // fuerza recarga de datos del servidor en la próxima navegación
    try {
      window.location.reload();
    } catch {
      // noop
    }
  };

  // t('nav.inicio') -> 'Inicio' / 'Home'. Si falta la clave, devuelve la ruta.
  const t = (path) =>
    String(path)
      .split('.')
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), messages) ?? path;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

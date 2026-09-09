'use client';

import { ThemeProvider } from "@/_Extras/CambiodeColor/ThemeProvider.js";
import { LanguageProvider } from "@/_Extras/Idioma/LanguageProvider.js";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}

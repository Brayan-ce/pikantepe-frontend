'use client';

import { ThemeProvider } from "@/_Extras/CambiodeColor/ThemeProvider.js";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

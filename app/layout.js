import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./Providers.js";
import { SidebarProvider } from "./sidebarContext.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://pikantepe.com'),
  title: {
    default: 'pikante pe — Videos, packs y comunidad',
    template: '%s | pikante pe',
  },
  description:
    'pikante pe: descubre videos, packs exclusivos, transmisiones en vivo y comunidad. El mejor contenido picante en un solo lugar.',
  keywords: ['videos', 'packs', 'comunidad', 'tendencias', 'fetiches', 'hentai', 'en vivo', 'picante'],
  authors: [{ name: 'pikante pe' }],
  creator: 'pikante pe',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://pikantepe.com',
    siteName: 'pikante pe',
    title: 'pikante pe — Videos, packs y comunidad',
    description:
      'Descubre videos, packs exclusivos, transmisiones en vivo y comunidad en pikante pe',
    images: [{ url: '/logo.png', alt: 'pikante pe' }],
  },
  twitter: {
    card: 'summary',
    title: 'pikante pe — Videos, packs y comunidad',
    description:
      'Descubre videos, packs exclusivos, transmisiones en vivo y comunidad en pikante pe',
    images: ['/logo.png'],
  },
};

export const viewport = {
  themeColor: '#F20D16',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head />
      <body>
        <Script 
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          type="module"
          strategy="beforeInteractive"
        />
        <SidebarProvider>
          <Providers>
            {children}
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}

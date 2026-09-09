import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers.js";
import { SidebarProvider } from "./sidebarContext.js";
import Script from "next/script";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PKXNFDBB');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PKXNFDBB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          type="module"
          strategy="afterInteractive"
        />
        <Providers>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}

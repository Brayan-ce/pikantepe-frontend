export default function manifest() {
  return {
    name: 'pikante pe.pe — Videos, packs y comunidad',
    short_name: 'pikante pe',
    description: 'Descubre videos, packs exclusivos, transmisiones en vivo y comunidad en pikante pe.pe',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#F20D16',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}

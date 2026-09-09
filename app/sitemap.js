import { getContenido } from '@/data/datos';

const BASE = 'https://www.pikantepe.com';

export default function sitemap() {
  // Sitemap en español; las rutas /en se agregan cuando exista routing por locale.
  const data = getContenido('es');
  const staticRoutes = [
    '',
    '/videos',
    '/tendencias',
    '/fetiches',
    '/packs',
    '/comunidad',
    '/hentai',
  ].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  const videoRoutes = [...data.videos, ...(data.hentai || [])].map((v) => ({
    url: `${BASE}/videos/${v.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const feticheRoutes = (data.fetiches || []).map((f) => ({
    url: `${BASE}/videos/fetiches/${f.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const packRoutes = data.packs.map((p) => ({
    url: `${BASE}/packs/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...videoRoutes, ...feticheRoutes, ...packRoutes];
}

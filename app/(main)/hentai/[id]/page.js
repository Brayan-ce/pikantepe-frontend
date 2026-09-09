import Header from '@/_Pages/main/layouts/Header/Header';
import Sidebar from '@/_Pages/main/layouts/headerLateralIzquierdo';
import HentaiPlayer from '@/_Pages/main/Hentai/hentaiPlayer';
import styles from '@/app/(main)/page.module.css';
import { getContenido } from '@/data/datos';
import { cookies } from 'next/headers';

async function getLocale() {
  const c = (await cookies()).get('locale')?.value;
  return c === 'en' ? 'en' : 'es';
}

function findHentai(data, id) {
  return data.hentai?.find((h) => String(h.id) === String(id));
}

function toInfo(entry) {
  if (!entry) return null;
  return {
    title: entry.title,
    views: entry.viewsFull,
    date: entry.date,
    channel: entry.channel,
    since: entry.since,
    tags: entry.tags,
    desc: entry.desc,
  };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = findHentai(getContenido(await getLocale()), id);
  if (!entry) return { title: 'Anime not found' };
  const title = entry.title;
  const description = `${entry.viewsFull || entry.views || ''} • ${entry.channel || ''}`.trim();
  return {
    title,
    description: description || `Watch ${title} on pikante pe`,
    keywords: entry.tags,
    alternates: { canonical: `/hentai/${id}` },
    openGraph: { title: `${title} | pikante pe`, description },
  };
}

export default async function HentaiPage({ params }) {
  const { id } = await params;
  const entry = findHentai(getContenido(await getLocale()), id);
  const src = entry?.src || '/videos/1.mov';

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <HentaiPlayer hentaiId={id} src={src} info={toInfo(entry)} />
      </div>
    </div>
  );
}

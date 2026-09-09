import Header from '@/_Pages/main/layouts/Header/Header';
import Sidebar from '@/_Pages/main/layouts/headerLateralIzquierdo';
import VideosClient from '@/_Pages/main/Videos/videos.js';
import styles from '@/app/(main)/page.module.css';
import data from '@/data/data.json';

function findFetiche(id) {
  return (data.fetiches || []).find((f) => String(f.id) === String(id));
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
  const entry = findFetiche(id);
  if (!entry) return { title: 'Video no encontrado' };
  const description = `${entry.viewsFull || ''} • ${entry.channel || ''}`.trim();
  return {
    title: entry.title,
    description: description || `Mira ${entry.title} en pikante pe`,
    keywords: entry.tags,
    alternates: { canonical: `/videos/fetiches/${id}` },
    openGraph: { title: `${entry.title} | pikante pe`, description },
  };
}

export default async function FeticheVideoPage({ params }) {
  const { id } = await params;
  const entry = findFetiche(id);
  const num = String(id ?? '1').padStart(2, '0');
  const src = entry?.src || `/videos/fetiches/fetiche_${num}.mp4`;

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <VideosClient videoId={id} src={src} info={toInfo(entry)} />
      </div>
    </div>
  );
}

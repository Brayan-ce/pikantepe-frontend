import Header from '@/_Pages/main/layouts/Header/Header';
import Sidebar from '@/_Pages/main/layouts/headerLateralIzquierdo';
import VideosClient from '@/_Pages/main/Videos/videos.js';
import styles from '@/app/(main)/page.module.css';
import data from '@/data/data.json';

function findVideo(id) {
  return [...data.videos, ...(data.hentai || []), ...(data.fetiches || [])].find(
    (v) => String(v.id) === String(id)
  );
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
  const entry = findVideo(id);
  if (!entry) return { title: 'Video no encontrado' };
  const title = entry.title;
  const description = `${entry.viewsFull || entry.views || ''} • ${entry.channel || ''}`.trim();
  return {
    title,
    description: description || `Mira ${title} en pikante pe`,
    keywords: entry.tags,
    alternates: { canonical: `/videos/${id}` },
    openGraph: { title: `${title} | pikante pe`, description },
  };
}

export default async function VideoPage({ params }) {
  const { id } = await params;
  const entry = findVideo(id);
  const src = entry?.src || '/videos/1.mov';

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

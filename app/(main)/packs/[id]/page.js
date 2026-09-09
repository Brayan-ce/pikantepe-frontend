import Header from '@/_Pages/main/layouts/Header/Header';
import Sidebar from '@/_Pages/main/layouts/headerLateralIzquierdo';
import PackDetalle from '@/_Pages/main/Packs/componentes/detalle';
import styles from '@/app/(main)/page.module.css';
import data from '@/data/data.json';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pack = data.packs.find((p) => String(p.id) === String(id));
  if (!pack) return { title: 'Pack no encontrado' };
  const description = `${pack.fotos} fotos • ${pack.videos} videos de ${pack.uploader}`;
  return {
    title: pack.title,
    description: `Descarga ${pack.title}: ${description} en pikante pe`,
    alternates: { canonical: `/packs/${id}` },
    openGraph: { title: `${pack.title} | pikante pe`, description },
  };
}

export default async function PackPage({ params }) {
  const { id } = await params;

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <PackDetalle packId={id} />
      </div>
    </div>
  );
}

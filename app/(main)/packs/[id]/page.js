import Header from '@/_Pages/main/layouts/Header/Header';
import Sidebar from '@/_Pages/main/layouts/headerLateralIzquierdo';
import PackDetalle from '@/_Pages/main/Packs/componentes/detalle';
import styles from '@/app/(main)/page.module.css';
import { getContenido } from '@/data/datos';
import { cookies } from 'next/headers';

async function getLocale() {
  const c = (await cookies()).get('locale')?.value;
  return c === 'en' ? 'en' : 'es';
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getContenido(await getLocale());
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

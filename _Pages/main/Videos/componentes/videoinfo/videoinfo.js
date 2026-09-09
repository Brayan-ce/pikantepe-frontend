'use client';

import { useState } from 'react';
import styles from './videoinfo.module.css';
import data from '@/data/data.json';
import DescargaModal from '@/_Pages/main/Packs/componentes/descarga';
import CompartirModal from '@/_Pages/main/Videos/componentes/compartir';
import { SMARTLINK_URL } from '@/_Pages/main/Home/componentes/anuncio/ads.js';

const INFO = Object.fromEntries(
  data.videos.map((v) => [
    v.id,
    {
      title: v.title,
      views: v.viewsFull,
      date: v.date,
      channel: v.channel,
      since: v.since,
      tags: v.tags,
      desc: v.desc,
    },
  ])
);

export default function VideoInfo({ videoId, info: infoProp = null, src = '/videos/1.mov' }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dlOpen, setDlOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const info = infoProp || INFO[videoId] || { title: `Video #${videoId ?? ''}`, views: '0 vistas', date: 'reciente', channel: 'Canal Picante', since: '2024', tags: ['nuevo'], desc: 'Descripción del video próximamente.' };

  function openShare() {
    setShareOpen(true);
  }

  function like() {
    setLiked((p) => !p);
    setDisliked(false);
  }

  function dislike() {
    setDisliked((p) => !p);
    setLiked(false);
  }

  return (
    <div className={styles.col}>
      <div className={styles.videoHead}>
        <h1 className={styles.videoTitle}>{info.title}</h1>
        <p className={styles.videoMeta}>{info.views} • {info.date}</p>
      </div>

      <div className={styles.channelRow}>
        <div className={styles.channel}>
          <div className={styles.avatar} />
          <div>
            <div className={styles.channelName}>
              <span>{info.channel}</span>
              <ion-icon name="checkmark-circle" className={styles.verified} suppressHydrationWarning></ion-icon>
            </div>
            <span className={styles.channelSince}>Suscriptor desde: {info.since}</span>
          </div>
          <div className={styles.inlineActions}>
            <button
              className={`${styles.inlineBtn} ${liked ? styles.inlineActive : ''}`}
              type="button"
              aria-label="Me gusta"
              onClick={like}
            >
              <ion-icon name={liked ? 'thumbs-up-sharp' : 'thumbs-up-outline'} suppressHydrationWarning></ion-icon>
            </button>
            <button
              className={`${styles.inlineBtn} ${disliked ? styles.inlineActive : ''}`}
              type="button"
              aria-label="No me gusta"
              onClick={dislike}
            >
              <ion-icon name={disliked ? 'thumbs-down-sharp' : 'thumbs-down-outline'} suppressHydrationWarning></ion-icon>
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.actionBtn} ${styles.hideMobile} ${liked ? styles.actionActive : ''}`} type="button" onClick={like}>
            <ion-icon name="thumbs-up-sharp" className={styles.actionIcon} suppressHydrationWarning></ion-icon> Like
          </button>
          <button className={`${styles.actionBtn} ${styles.hideMobile} ${disliked ? styles.actionActive : ''}`} type="button" onClick={dislike}>
            <ion-icon name="thumbs-down-sharp" className={styles.actionIcon} suppressHydrationWarning></ion-icon> Dislike
          </button>
          <button className={`${styles.actionBtn} ${saved ? styles.actionActive : ''}`} type="button" onClick={() => setSaved((p) => !p)}>
            <ion-icon name={saved ? 'bookmark' : 'bookmark-outline'} className={styles.actionIcon} suppressHydrationWarning></ion-icon> Guardar
          </button>
          <button className={styles.actionBtn} type="button" onClick={openShare}>
            <ion-icon name="share-social-outline" className={styles.actionIcon} suppressHydrationWarning></ion-icon> Compartir
          </button>
          <button className={`${styles.actionBtn} ${reported ? styles.actionActive : ''}`} type="button" onClick={() => setReported((p) => !p)}>
            <ion-icon name="flag-outline" className={styles.actionIcon} suppressHydrationWarning></ion-icon> {reported ? 'Reportado' : 'Reportar'}
          </button>
          <button className={`${styles.actionBtn} ${styles.actionDownload}`} type="button" onClick={() => setDlOpen(true)}>
            <ion-icon name="download-outline" className={styles.actionIcon} suppressHydrationWarning></ion-icon> Descargar
          </button>
        </div>
      </div>

      <DescargaModal
        open={dlOpen}
        onClose={() => setDlOpen(false)}
        paso1={SMARTLINK_URL}
        paso2={SMARTLINK_URL}
        directo={src}
        titulo="Descargar video"
      />

      <CompartirModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={info.title}
      />

      <div className={styles.descBox}>
        <div className={styles.tagsRow}>
          <span className={styles.tagsLabel}>Etiquetas:</span>
          {info.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <p className={`${styles.desc} ${expanded ? styles.descFull : ''}`}>{info.desc}</p>
        <span className={styles.showMore} onClick={() => setExpanded((p) => !p)}>{expanded ? 'Mostrar menos' : 'Mostrar más'}</span>
      </div>
    </div>
  );
}

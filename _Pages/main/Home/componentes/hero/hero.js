'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './hero.module.css';
import { useTheme } from '@/_Extras/CambiodeColor/ThemeProvider.js';

const suggestions = [
  { label: 'Tendencias', href: '/tendencias', icon: 'trending-up-outline' },
  { label: 'Recién subidos', href: '/videos', icon: 'sparkles-outline' },
  { label: 'Fetiches', href: '/fetiches', icon: 'flame-outline' },
  { label: 'Packs', href: '/packs', icon: 'cube-outline' },
  { label: 'Comunidad', href: '/comunidad', icon: 'people-outline' },
];

const slides = [
  {
    id: 'welcome',
    eyebrow: 'Bienvenidos a la familia',
    title: 'Hola, esta es tu casa',
    text: 'Videos, packs, lives y categorías: todo el contenido picante en un solo lugar. Elige por dónde empezar.',
    primary: { label: 'Explorar tendencias', href: '/tendencias' },
    secondary: { label: 'Recién subidos', href: '/videos' },
  },
  {
    id: 'aviso',
    eyebrow: 'Aviso a la comunidad',
    title: 'Mejoramos cada día',
    text: 'La aplicación está siendo mantenida y mejorada constantemente. Si vemos bastante apoyo, meteremos más cosas que le gustan a mi comunidad.',
    primary: { label: 'Ver lo nuevo', href: '/videos' },
    secondary: null,
  },
];

const visualTags = ['película japonesa', 'orgía', 'tendencia', 'JAV', 'trío', 'HD'];

export default function Hero() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const logoSrc = isDark ? '/logo.png' : '/logo_oscuro.png';

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(t);
  }, [paused]);

  function go(dir) {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.waves} aria-hidden="true" />

      <div className={styles.textCol} key={slide.id}>
        {slide.id === 'welcome' ? (
          <span className={styles.logoBadge}>
            <img src={logoSrc} alt="PICANTE.pe" className={styles.logoBadgeImg} />
            {slide.eyebrow}
          </span>
        ) : (
          <span className={styles.eyebrow}>
            <ion-icon name="construct-outline" className={styles.eyebrowIcon} suppressHydrationWarning></ion-icon>
            {slide.eyebrow}
          </span>
        )}
        <h2 className={styles.title}>{slide.title}</h2>
        <p className={styles.text}>{slide.text}</p>

        {slide.id === 'welcome' && (
          <div className={styles.suggestions}>
            {suggestions.map((s) => (
              <button
                key={s.label}
                className={styles.suggChip}
                type="button"
                onClick={() => router.push(s.href)}
              >
                <ion-icon name={s.icon} className={styles.suggIcon} suppressHydrationWarning></ion-icon>
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.ctaRow}>
          <button className={styles.cta} type="button" onClick={() => router.push(slide.primary.href)}>
            {slide.primary.label}
            <ion-icon name="arrow-forward-outline" className={styles.ctaIcon} suppressHydrationWarning></ion-icon>
          </button>
          {slide.secondary && (
            <button className={styles.ctaGhost} type="button" onClick={() => router.push(slide.secondary.href)}>
              {slide.secondary.label}
            </button>
          )}
        </div>
      </div>

      <div className={styles.visual}>
        <div
          className={styles.visualMedia}
          role="link"
          tabIndex={0}
          onClick={() => router.push('/videos/fetiches/1')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              router.push('/videos/fetiches/1');
            }
          }}
        >
          <img src="/home/hero1.png" alt="Bienvenida de la familia PICANTE.pe" className={styles.visualImg} />
          <span className={styles.bestBadge}>
            <ion-icon name="star" className={styles.bestIcon} suppressHydrationWarning></ion-icon>
            MEJOR RECOMENDACIÓN
          </span>
          <button
            className={styles.playBtn}
            type="button"
            aria-label="Reproducir video recomendado"
            onClick={(e) => {
              e.stopPropagation();
              router.push('/videos/fetiches/1');
            }}
          >
            <ion-icon name="play-sharp" className={styles.playIcon} suppressHydrationWarning></ion-icon>
          </button>
        </div>
        <div className={styles.visualFoot}>
          <h3 className={styles.visualTitle}>Familia Japonesa :3</h3>
          <div className={styles.visualTags}>
            {visualTags.map((tag) => (
              <button
                key={tag}
                className={styles.visualTag}
                type="button"
                onClick={() => router.push('/fetiches')}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        type="button"
        aria-label="Anterior"
        onClick={() => go(-1)}
      >
        <ion-icon name="chevron-back-outline" suppressHydrationWarning></ion-icon>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        type="button"
        aria-label="Siguiente"
        onClick={() => go(1)}
      >
        <ion-icon name="chevron-forward-outline" suppressHydrationWarning></ion-icon>
      </button>

      <div className={styles.dots}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            type="button"
            aria-label={`Ir al aviso ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

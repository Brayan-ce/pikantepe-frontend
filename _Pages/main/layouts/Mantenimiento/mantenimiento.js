'use client';

import { useEffect } from 'react';
import styles from './mantenimiento.module.css';
import { useSidebar } from '@/app/sidebarContext.js';

export default function MantenimientoModal() {
  const { maintOpen, closeMaint } = useSidebar();

  useEffect(() => {
    if (!maintOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') closeMaint();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [maintOpen, closeMaint]);

  if (!maintOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeMaint}>
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-label="Sección en mantenimiento"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconWrap}>
          <ion-icon name="construct-outline" className={styles.icon} suppressHydrationWarning></ion-icon>
        </div>
        <h3 className={styles.title}>Sección en mantenimiento</h3>
        <p className={styles.text}>
          Estamos trabajando en esta sección.
          Estará disponible en unas horas o en 1 a 2 días.
        </p>
        <button className={styles.btn} type="button" onClick={closeMaint}>
          Entendido
        </button>
      </div>
    </div>
  );
}

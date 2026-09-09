'use client';

import { useEffect } from 'react';
import styles from './anuncio.module.css';

export default function AdNative({ containerId, src }) {
  useEffect(() => {
    if (!containerId || !src) return;
    const flag = `__adNativeLoaded_${containerId}`;
    if (window[flag]) return;
    window[flag] = true;
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = src;
    document.body.appendChild(s);
  }, [containerId, src]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>ANUNCIO</span>
      <div id={containerId} />
    </div>
  );
}

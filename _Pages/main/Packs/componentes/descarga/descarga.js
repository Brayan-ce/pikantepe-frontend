'use client';

import { useEffect, useState } from 'react';
import styles from './descarga.module.css';

export default function DescargaModal({ open, onClose, paso1, paso2, directo, titulo = 'Descargar' }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (open) setStep(1);
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.dlOverlay} onClick={onClose}>
      <div
        className={styles.dlCard}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dlHead}>
          <h3 className={styles.dlTitle}>{titulo}</h3>
          <button className={styles.dlClose} type="button" aria-label="Cerrar" onClick={onClose}>
            <ion-icon name="close-outline" suppressHydrationWarning></ion-icon>
          </button>
        </div>

        <div className={`${styles.dlStep} ${step > 1 ? styles.dlStepDone : ''}`}>
          <span className={styles.dlNum}>{step > 1 ? <ion-icon name="checkmark-sharp" suppressHydrationWarning></ion-icon> : '1'}</span>
          <div className={styles.dlStepBody}>
            <p className={styles.dlStepTitle}>Paso 1: abre el enlace</p>
            <p className={styles.dlStepText}>Da click para desbloquear el siguiente paso.</p>
            <p className={styles.dlHint}>
              <ion-icon name="information-circle-outline" suppressHydrationWarning></ion-icon>
              La pestaña que se abra ciérrala nomás, no importa — solo es para liberar el siguiente paso.
            </p>
            <a
              className={styles.dlStepBtn}
              href={paso1}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() => setStep((s) => Math.max(s, 2))}
            >
              Abrir enlace 1
              <ion-icon name="open-outline" className={styles.dlCheck} suppressHydrationWarning></ion-icon>
            </a>
          </div>
        </div>

        <div className={`${styles.dlStep} ${step < 2 ? styles.dlStepLocked : ''} ${step > 2 ? styles.dlStepDone : ''}`}>
          <span className={styles.dlNum}>{step > 2 ? <ion-icon name="checkmark-sharp" suppressHydrationWarning></ion-icon> : '2'}</span>
          <div className={styles.dlStepBody}>
            <p className={styles.dlStepTitle}>Paso 2: confirma el segundo enlace</p>
            <p className={styles.dlStepText}>Con esto se libera la descarga directa.</p>
            <p className={styles.dlHint}>
              <ion-icon name="information-circle-outline" suppressHydrationWarning></ion-icon>
              Igual que antes: cierra la pestaña que se abra y sigue nomás.
            </p>
            <a
              className={styles.dlStepBtn}
              href={step >= 2 ? paso2 : undefined}
              target="_blank"
              rel="sponsored nofollow noopener"
              aria-disabled={step < 2}
              onClick={(e) => {
                if (step < 2) {
                  e.preventDefault();
                  return;
                }
                setStep(3);
              }}
              style={step < 2 ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
            >
              Abrir enlace 2
              <ion-icon name="open-outline" className={styles.dlCheck} suppressHydrationWarning></ion-icon>
            </a>
          </div>
        </div>

        <div className={`${styles.dlStep} ${step < 3 ? styles.dlStepLocked : ''} ${styles.dlStepDone}`}>
          <span className={styles.dlNum}>{step >= 3 ? <ion-icon name="checkmark-sharp" suppressHydrationWarning></ion-icon> : '3'}</span>
          <div className={styles.dlStepBody}>
            <p className={styles.dlStepTitle}>Paso 3: descarga directa</p>
            <p className={styles.dlStepText}>Tu archivo está listo, dale sin miedo.</p>
            <a
              className={styles.dlStepBtn}
              href={step >= 3 ? directo : undefined}
              target="_blank"
              rel="nofollow noopener"
              aria-disabled={step < 3}
              onClick={(e) => {
                if (step < 3) e.preventDefault();
              }}
              style={step < 3 ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
            >
              <ion-icon name="download-outline" className={styles.dlCheck} suppressHydrationWarning></ion-icon>
              Descargar archivo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

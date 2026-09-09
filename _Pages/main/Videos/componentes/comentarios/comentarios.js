'use client';

import { useState } from 'react';
import styles from './comentarios.module.css';
import data from '@/data/data.json';

const SEED = data.comments.default;

export default function Comentarios({ videoId }) {
  const [comments, setComments] = useState(data.comments[String(videoId)] || SEED);
  const [draft, setDraft] = useState('');
  const [sort, setSort] = useState('top');
  const [likedIds, setLikedIds] = useState({});
  const [openReplies, setOpenReplies] = useState({});

  function post() {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      { id: Date.now(), user: 'Tú', time: 'ahora mismo', text, likes: 0, replies: [] },
      ...prev,
    ]);
    setDraft('');
  }

  function toggleLike(id) {
    setLikedIds((prev) => {
      const liked = !prev[id];
      setComments((list) =>
        list.map((c) =>
          c.id === id ? { ...c, likes: c.likes + (liked ? 1 : -1) } : c
        )
      );
      return { ...prev, [id]: liked };
    });
  }

  function toggleReplies(id) {
    setOpenReplies((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const shown = [...comments].sort((a, b) =>
    sort === 'new' ? b.id - a.id : b.likes - a.likes
  );

  return (
    <section className={styles.box}>
      <div className={styles.head}>
        <h3 className={styles.title}>{comments.length} comentarios</h3>
        <div className={styles.sortBtns}>
          <button
            className={`${styles.sortBtn} ${sort === 'top' ? styles.sortActive : ''}`}
            type="button"
            onClick={() => setSort('top')}
          >
            Más relevantes
          </button>
          <button
            className={`${styles.sortBtn} ${sort === 'new' ? styles.sortActive : ''}`}
            type="button"
            onClick={() => setSort('new')}
          >
            Más recientes
          </button>
        </div>
      </div>

      <div className={styles.addRow}>
        <div className={styles.avatar}>T</div>
        <div className={styles.addBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="Comentarios en mantenimiento..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled
          />
          <div className={styles.addActions}>
            <button className={styles.cancelBtn} type="button" onClick={() => setDraft('')} disabled>
              Cancelar
            </button>
            <button
              className={styles.postBtn}
              type="button"
              disabled
            >
              Comentar
            </button>
          </div>
        </div>
      </div>

      <div className={styles.lockWrap}>
        <div className={`${styles.list} ${styles.locked}`} key={`${videoId}-${sort}`} aria-hidden="true">
        {shown.map((c) => (
          <div key={c.id} className={styles.comment}>
            <div className={styles.avatar}>{c.user.charAt(0).toUpperCase()}</div>
            <div className={styles.commentBody}>
              <div className={styles.commentHead}>
                <span className={styles.user}>{c.user}</span>
                <span className={styles.time}>{c.time}</span>
              </div>
              <p className={styles.text}>{c.text}</p>
              <div className={styles.commentActions}>
                <button
                  className={`${styles.likeBtn} ${likedIds[c.id] ? styles.liked : ''}`}
                  type="button"
                  onClick={() => toggleLike(c.id)}
                  aria-label="Me gusta en comentario"
                >
                  <ion-icon name={likedIds[c.id] ? 'thumbs-up-sharp' : 'thumbs-up-outline'} className={styles.likeIcon} suppressHydrationWarning></ion-icon>
                  {c.likes}
                </button>
                <button className={styles.replyBtn} type="button">
                  <ion-icon name="thumbs-down-outline" className={styles.likeIcon} suppressHydrationWarning></ion-icon>
                </button>
                {c.replies.length > 0 && (
                  <button className={styles.repliesToggle} type="button" onClick={() => toggleReplies(c.id)}>
                    <ion-icon name={openReplies[c.id] ? 'chevron-up-outline' : 'chevron-down-outline'} className={styles.likeIcon} suppressHydrationWarning></ion-icon>
                    {c.replies.length} {c.replies.length === 1 ? 'respuesta' : 'respuestas'}
                  </button>
                )}
                <button className={styles.replyBtn} type="button">Responder</button>
              </div>
              {openReplies[c.id] && c.replies.length > 0 && (
                <div className={styles.replies}>
                  {c.replies.map((r) => (
                    <div key={r.id} className={styles.reply}>
                      <div className={styles.avatarSm}>{r.user.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className={styles.commentHead}>
                          <span className={styles.user}>{r.user}</span>
                          <span className={styles.time}>{r.time}</span>
                        </div>
                        <p className={styles.text}>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
        <div className={styles.lockOverlay}>
          <div className={styles.lockCard}>
            <ion-icon name="construct-outline" className={styles.lockIcon} suppressHydrationWarning></ion-icon>
            <p className={styles.lockTitle}>Comentarios en mantenimiento</p>
            <p className={styles.lockText}>En unos días lo habilitaremos</p>
            <p className={styles.lockFav}>
              <ion-icon name="star-outline" className={styles.lockStar} suppressHydrationWarning></ion-icon>
              Guarda la aplicación en tus favoritos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

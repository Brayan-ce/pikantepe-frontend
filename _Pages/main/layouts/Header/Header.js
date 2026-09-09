'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';
import { useTheme } from '@/_Extras/CambiodeColor/ThemeProvider.js';
import { useSidebar } from '@/app/sidebarContext.js';
import { useLanguage } from '@/_Extras/Idioma/LanguageProvider.js';

const filters = [
  { value: 'recientes', label: 'filtros.recientes' },
  { value: 'vistos', label: 'filtros.vistos' },
  { value: 'likes', label: 'filtros.likes' },
  { value: 'hd', label: 'HD' },
  { value: '4k', label: '4K' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { isOpen, toggle: toggleSidebar, openMaint } = useSidebar();
  const { t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearch() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    setSearchOpen(false);
  }

  function handleProfileClick() {
    openMaint();
  }

  return (
    <>
      <header className={styles.headerContainer} ref={searchRef}>
        <button
          className={styles.hamburger}
          onClick={toggleSidebar}
          aria-label={isOpen ? t('header.cerrarMenu') : t('header.abrirMenu')}
          type="button"
        >
          <ion-icon name={isOpen ? 'close-outline' : 'menu-outline'} suppressHydrationWarning></ion-icon>
        </button>

        <div className={styles.searchIconOnly}>
          <ion-icon name="search-outline" onClick={() => setSearchOpen(true)} style={{ cursor: 'pointer' }} suppressHydrationWarning></ion-icon>
        </div>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t('header.buscar')}
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <ion-icon name="search-outline" className={styles.searchIcon} suppressHydrationWarning></ion-icon>
        </div>

        <div className={styles.logoSection} onClick={() => router.push('/')}>
          <img
            src={isDark ? '/logo.png' : '/logo_oscuro.png'}
            alt="Picante"
            className={styles.logoIcon}
          />
        </div>

        <div className={styles.actionsContainer}>
          <div className={styles.notificationWrapper}>
            <ion-icon name="notifications-outline" className={styles.bellIcon} suppressHydrationWarning></ion-icon>
            <span className={styles.badge}>3</span>
          </div>

          <div className={styles.messageWrapper}>
            <ion-icon name="mail-outline" className={styles.messageIcon} suppressHydrationWarning></ion-icon>
          </div>

          <div className={styles.divider}></div>

          <button
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={t('header.tema')}
            type="button"
          >
            <ion-icon name={isDark ? 'sunny-outline' : 'moon-outline'} className={styles.themeIcon} suppressHydrationWarning></ion-icon>
          </button>

          <div className={styles.divider}></div>

          <div className={styles.profileMenu} onClick={handleProfileClick}>
            <ion-icon name="person-circle-outline" className={styles.profileIcon} suppressHydrationWarning></ion-icon>
            <span className={styles.profileLabel}>{t('header.miPerfil')}</span>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className={styles.searchDropdown}>
          <div className={styles.searchDropdownInner}>
            <div className={styles.searchDropdownInput}>
              <ion-icon name="search-outline" className={styles.searchDropdownIcon} suppressHydrationWarning></ion-icon>
              <input
                type="text"
                placeholder={t('header.buscarCorto')}
                className={styles.searchDropdownInputField}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className={styles.searchDropdownBtn} onClick={handleSearch} type="button">
                {t('header.buscarBtn')}
              </button>
            </div>
            <div className={styles.searchFilters}>
              {filters.map((f) => (
                <button key={f.value} className={styles.filterChip} type="button">{t(f.label)}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

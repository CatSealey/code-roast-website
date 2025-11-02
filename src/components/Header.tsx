
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.body.classList.contains('dark-mode');
  });

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newMode;
    });
  };

  const { t } = useTranslation();
  // Dropdown state
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
    const homeRef = React.useRef<HTMLDivElement>(null);
    const communityRef = React.useRef<HTMLDivElement>(null);

  // Helper to get dropdown position
  const getDropdownPosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    return { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX };
  };

  // Dropdown menu portal
  const DropdownMenu = ({ open, position, children, width }: { open: boolean, position: { top: number, left: number }, children: React.ReactNode, width: string }) => {
    if (!open) return null;
    return createPortal(
      <div style={{ position: 'absolute', top: position.top, left: position.left, width, zIndex: 99999 }}
        className="bg-white dark:bg-gray-900 rounded shadow-lg transition-all duration-300">
        {children}
      </div>,
      document.body
    );
  };

  return (
    <header className="gradient-bg text-white shadow-lg relative py-3">
      <div className="floating-shapes">
        {/* ...existing code... */}
        <div className="shape">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        </div>
        {/* ...existing code... */}
      </div>
      <nav className="container mx-auto px-6 py-10 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* ...existing code... */}
            <img src="/logo/code-roast-white-icon.png" alt="Code-Roast Logo" className="w-8 h-8 interactive-icon" />
            <img src="/logo/code-roast-white-text.png" alt="Code-Roast" className="h-6" />
          </div>
          <div className="flex space-x-6 items-center">
            <div
              className="relative"
              ref={homeRef}
              onMouseEnter={() => setHomeDropdownOpen(true)}
              onMouseLeave={() => setHomeDropdownOpen(false)}
            >
              <Link to="/" className="text-white hover:text-orange-200 transition-all duration-300 hover:scale-110">{t('header.home')}</Link>
              <DropdownMenu
                open={homeDropdownOpen}
                position={getDropdownPosition(homeRef)}
                width="10rem"
              >
                <a href="/#services" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.services')}</a>
                <a href="/#about" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.about')}</a>
                <a href="/#contact" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.contact')}</a>
              </DropdownMenu>
            </div>
            <div
              className="relative"
              ref={communityRef}
              onMouseEnter={() => setCommunityDropdownOpen(true)}
              onMouseLeave={() => setCommunityDropdownOpen(false)}
            >
              <Link to="/community" className="text-white hover:text-orange-200 transition-all duration-300 hover:scale-110">{t('header.community')}</Link>
              <DropdownMenu
                open={communityDropdownOpen}
                position={getDropdownPosition(communityRef)}
                width="14rem"
              >
                <a href="/community#solid" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.solid')}</a>
                <a href="/community#triple" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.triple')}</a>
                <a href="/community#bigo" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900">{t('header.bigo')}</a>
              </DropdownMenu>
            </div>
            <button
              id="dark-mode-toggle"
              className="ml-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 interactive-icon"
              onClick={handleToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg id="moon-icon" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                </svg>
              ) : (
                <svg id="sun-icon" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06L5.106 17.834a.75.75 0 001.06 1.06l1.592-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.592a.75.75 0 00-1.061 1.061l1.59 1.591z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

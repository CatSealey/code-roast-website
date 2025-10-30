
import { useState } from 'react';

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

  return (
    <header className="gradient-bg text-white shadow-lg relative">
      <div className="floating-shapes">
        <div className="shape">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        </div>
        <div className="shape">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)"><circle cx="12" cy="12" r="10" /></svg>
        </div>
        <div className="shape">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)"><polygon points="12,2 22,20 2,20" /></svg>
        </div>
        <div className="shape">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
        </div>
      </div>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 interactive-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
            </svg>
            <h1 id="company-name" className="text-2xl font-bold neon-text">Code-Roast</h1>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="#services" className="hover:text-orange-200 transition-all duration-300 hover:scale-110">Services</a>
            <a href="#about" className="hover:text-orange-200 transition-all duration-300 hover:scale-110">About</a>
            <a href="#contact" className="hover:text-orange-200 transition-all duration-300 hover:scale-110">Contact</a>
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

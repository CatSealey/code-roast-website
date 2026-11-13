
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const Hero: React.FC = () => {
  const { t } = useTranslation();
  // Get subtitles as separate keys
  const subtitle1 = t('hero.subtitle1');
  const subtitle2 = t('hero.subtitle2');
  const subtitle3 = t('hero.subtitle3');

  // Typewriter effect for each subtitle line
  const [typed1, setTyped1] = useState('');
  const [typed2, setTyped2] = useState('');
  const [typed3, setTyped3] = useState('');

  // Typewriter for subtitle1
  useEffect(() => {
    if (typed1.length < subtitle1.length) {
      const timer = setTimeout(() => {
        setTyped1(subtitle1.slice(0, typed1.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [typed1, subtitle1]);

  // Typewriter for subtitle2 (starts after subtitle1 is done)
  useEffect(() => {
    if (typed1.length === subtitle1.length && typed2.length < subtitle2.length) {
      const timer = setTimeout(() => {
        setTyped2(subtitle2.slice(0, typed2.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [typed1, typed2, subtitle1, subtitle2]);

  // Typewriter for subtitle3 (starts after subtitle2 is done)
  useEffect(() => {
    if (typed2.length === subtitle2.length && typed3.length < subtitle3.length) {
      const timer = setTimeout(() => {
        setTyped3(subtitle3.slice(0, typed3.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [typed2, typed3, subtitle2, subtitle3]);
  return (
  <section className="gradient-bg text-white py-20 flex flex-col relative justify-center items-center" style={{overflowX: 'clip', overflowY: 'visible'}}>
      <img
        src="/logo/code-roast-white-outline.png"
        alt="Code-Roast Outline"
        className="hero-bean absolute pointer-events-none select-none"
        style={{
          zIndex: 1,
          width: '100%',
          maxWidth: '1300px',
          opacity: 0.4,
          filter: 'blur(15px)',
          transform: 'rotate(15deg) scale(0.77)',
        }}
      />
      <div className="floating-shapes">
        <div className="shape">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
        </div>
        <div className="shape">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
        </div>
        <div className="shape">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
        </div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <div className="flex flex-row items-center justify-center mb-16 mt-6">
          <img src="/logo/code-roast-white-icon.png" alt="Code Roast Icon" className="w-50 h-50 object-contain" style={{zIndex: 11}} />
          <div className="flex flex-col items-left">
            <img src="/logo/code-roast-white-text.png" alt="Code Roast Logo" className="mb-2 object-fill" style={{zIndex: 11}} />
            <h2 id="hero-title" className="text-4xl md:text-3xl font-medium fade-in neon-text text-left ml-4">
              {t('hero.title')}
            </h2>
          </div>
        </div>
        <div id="hero-subtitle" className="text-xl md:text-2xl mb-8 opacity-90 fade-in text-middle">
          <p className="subtitle-fade">
            <span>
              {typed1}
              {typed1.length < subtitle1.length ? <span className="typewriter-cursor">|</span> : null}
            </span>
          </p>
          <p className="subtitle-fade">
            <span>
              {typed2}
              {typed2.length < subtitle2.length ? <span className="typewriter-cursor">|</span> : null}
            </span>
          </p>
          <p className="subtitle-fade">
            <span>
              {typed3}
              {typed3.length < subtitle3.length ? <span className="typewriter-cursor">|</span> : null}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

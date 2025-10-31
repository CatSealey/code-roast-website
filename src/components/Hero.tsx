
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
    <section className="gradient-bg text-white py-20 relative overflow-hidden">
      <img
        src="/code-roast-white-outline.png"
        alt="Code Roast Outline"
        className="absolute right-20 pointer-events-none select-none"
        style={{
          zIndex: 10,
          width: '100%',
          maxWidth: '690px',
          opacity: 0.8,
          filter: 'blur(7px)',
          top: '-120px',
          left: '55%',
          transform: 'translateX(-20%) rotate(15deg) scale(0.77)',
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
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 id="hero-title" className="text-5xl md:text-6xl font-semibold mb-12 mt-12 fade-in neon-text text-left">
          {t('hero.title')}
        </h2>
        <div id="hero-subtitle" className="text-xl md:text-2xl mb-8 opacity-90 fade-in text-left">
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
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="line-chart relative h-64">
            <svg width="100%" height="80%" viewBox="0 0 1000 240" className="overflow-visible">
                <path
                    className="chart-line line1"
                    d="M 0,216 L 50,212 L 100,230 L 150,210 L 200,204 L 250,216 L 300,202 L 350,196 L 400,130 L 450,194 L 500,190 L 550,184 L 600,196 L 650,180 L 700,60 L 750,100 L 800,170 L 850,164 L 900,170"
                    stroke="var(--color-line1-light)"
                    strokeWidth={5}
                    fill="none"
                />
                <path
                    className="chart-line line2"
                    d="M 0,230 L 50,216 L 100,210 L 150,220 L 200,170 L 250,180 L 300,162 L 350,160 L 400,190 L 450,140 L 500,122 L 550,120 L 600,50 L 650,100 L 700,110 L 750,80 L 800,90 L 850,60 L 900,50"
                    stroke="var(--color-line2-light)"
                    strokeWidth={5}
                    fill="none"
                />
                <path
                    className="chart-line line3"
                    d="M 0,200 L 50,195 L 100,190 L 150,160 L 200,150 L 250,155 L 300,140 L 350,130 L 400,100 L 450,110 L 500,115 L 550,130 L 600,120 L 650,140 L 700,150 L 750,-50 L 800,30 L 850,35 L 900,10"
                    stroke="var(--color-line3-light)"
                    strokeWidth={5}
                    fill="none"
                />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

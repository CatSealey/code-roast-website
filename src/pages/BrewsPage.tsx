import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const tabPosts = [
  {
    key: 'solid',
    title: 'brewspage.tabs.solid.title',
    content: [
      'brewspage.tabs.solid.content.0',
      'brewspage.tabs.solid.content.1',
      'brewspage.tabs.solid.content.2',
      'brewspage.tabs.solid.content.3',
      'brewspage.tabs.solid.content.4',
      'brewspage.tabs.solid.content.5',
      'brewspage.tabs.solid.content.6'
    ]
  },
  {
    key: 'triple',
    title: 'brewspage.tabs.triple.title',
    content: [
      'brewspage.tabs.triple.content.0',
      'brewspage.tabs.triple.content.1',
      'brewspage.tabs.triple.content.2'
    ]
  },
  {
    key: 'bigo',
    title: 'brewspage.tabs.bigo.title',
    content: [
      'brewspage.tabs.bigo.content.0',
      'brewspage.tabs.bigo.content.1',
      'brewspage.tabs.bigo.content.2'
    ]
  }
];

const Brews: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const activePost = tabPosts[active];

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 flex flex-col relative justify-center items-center" style={{overflow: 'visible'}}>
        <img
          src="/logo/code-roast-white-outline.png"
          alt="Code Roast Outline"
          className="absolute pointer-events-none select-none"
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
          <div className="flex flex-row items-center justify-center mb-10 mt-6">
            <img src="/logo/code-roast-white-icon.png" alt="Code Roast Icon" className="w-50 h-50 object-contain" style={{zIndex: 11}} />
            <div className="flex flex-col items-left">
              <img src="/logo/code-roast-white-text.png" alt="Code Roast Logo" className="mb-2 object-fill w-64 h-auto" style={{zIndex: 11}} />
              <h2 className="text-4xl md:text-3xl font-medium fade-in neon-text text-left ml-4">
                {t('brewspage.heroTitle')}
              </h2>
            </div>
          </div>
          <div className="text-xl md:text-2xl mb-8 opacity-90 fade-in text-middle">
            <p className="subtitle-fade">{t('brewspage.heroSubtitle')}</p>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">{t('brewspage.title')}</h1>
        <p className="mb-8 text-lg opacity-80">{t('brewspage.description')}</p>
        <section className="mb-12">
          <div className="flex gap-4 mb-4">
            {tabPosts.map((post, idx) => (
              <button
                key={post.key}
                className={`btn btn-secondary morphing-button${active === idx ? ' morphing-button--active' : ''}`}
                onClick={() => setActive(idx)}
                >
                {t(post.title)}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            {activePost?.content.map((line, idx) => (
              <p key={idx} className="mb-2 text-base opacity-90">{t(line)}</p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Brews;

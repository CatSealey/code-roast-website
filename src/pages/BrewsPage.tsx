import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const tabPosts = [
  {
    key: 'solid',
    title: 'brewspage.tabs.solid.title',
    img: '/posts/SOLID-Principles/SOLID-1.png',
    desc: 'brewspage.tabs.solid.desc'
  },
  {
    key: 'triple',
    title: 'brewspage.tabs.triple.title',
    img: '/posts/Triple-Constraint/TC-1.png',
    desc: 'brewspage.tabs.triple.desc'
  },
  {
    key: 'bigo',
    title: 'brewspage.tabs.bigo.title',
    img: '/posts/Big-O/Big-O-1.png',
    desc: 'brewspage.tabs.bigo.desc'
  }
];

const Brews: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [gridView, setGridView] = useState(true);
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
            <div className="flex flex-col items-middle">
              <h2 className="text-5xl md:text-6xl font-medium fade-in neon-text text-left mr-20">
                {t('brewspage.heroTitle')}
              </h2>
              <img src="/logo/with-code-roast.png" alt="Code Roast Logo" className="mb-2 object-fill w-64 h-auto ml-20" style={{zIndex: 11}} />
            </div>
          </div>
          <div className="text-xl md:text-2xl mb-8 opacity-90 fade-in text-middle">
            <p className="subtitle-fade">{t('brewspage.heroSubtitle')}</p>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Coding Community & Continual Education</h1>
          <p className="mb-8 text-lg opacity-80">Welcome to the Code Roast community! Here, we believe learning is a lifelong journey. Connect, share, and grow with fellow coders as you explore new ideas and sharpen your skills. Grab a brew and join the conversation!</p>
        </section>
      </main>
      {/* Brews Grid/List Section */}
      <section className="my-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{t('brewspage.allBrewsTitle', 'All Brews')}</h2>
          <button
            className="btn btn-primary"
            onClick={() => setGridView((prev) => !prev)}
          >
            {gridView ? t('brewspage.listView', 'List View') : t('brewspage.gridView', 'Grid View')}
          </button>
        </div>
        <div className={gridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
          {tabPosts.map((brew) => (
            gridView ? (
              <div key={brew.key} className="card card-hover bg-white rounded-lg shadow-md p-0 flex flex-col items-center">
                <img src={brew.img} alt={t(brew.title)} className="w-68 h-68 object-cover rounded-lg mt-6" />
                <div className="p-6 w-full flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2 text-center">{t(brew.title)}</h3>
                  <p className="text-base opacity-90 mb-4 text-center">{t(`brewspage.tabs.${brew.key}.desc`, 'One line summary')}</p>
                  <a href={`#${brew.key}`} className="text-orange-600 font-semibold hover:underline">{t('brewspage.viewDetails', 'View Details')}</a>
                </div>
              </div>
            ) : (
              <div key={brew.key} className="card card-hover bg-white rounded-lg shadow-md p-4 flex flex-row items-center">
                <img src={brew.img} alt={t(brew.title)} className="w-24 h-24 object-cover rounded-lg mr-6 flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2">{t(brew.title)}</h3>
                  <p className="text-base opacity-90 mb-2">{t(`brewspage.tabs.${brew.key}.desc`, 'One line summary')}</p>
                  <a href={`#${brew.key}`} className="text-orange-600 font-semibold hover:underline">{t('brewspage.viewDetails', 'View Details')}</a>
                </div>
              </div>
            )
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

// Add gridView state

export default Brews;

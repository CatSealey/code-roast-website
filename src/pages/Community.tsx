import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const tabPosts = [
  {
    key: 'solid',
    title: 'community.tabs.solid.title',
    content: [
      'community.tabs.solid.content.0',
      'community.tabs.solid.content.1',
      'community.tabs.solid.content.2',
      'community.tabs.solid.content.3',
      'community.tabs.solid.content.4',
      'community.tabs.solid.content.5',
      'community.tabs.solid.content.6'
    ]
  },
  {
    key: 'triple',
    title: 'community.tabs.triple.title',
    content: [
      'community.tabs.triple.content.0',
      'community.tabs.triple.content.1',
      'community.tabs.triple.content.2'
    ]
  },
  {
    key: 'bigo',
    title: 'community.tabs.bigo.title',
    content: [
      'community.tabs.bigo.content.0',
      'community.tabs.bigo.content.1',
      'community.tabs.bigo.content.2'
    ]
  }
];

const Community: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const activePost = tabPosts[active];

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">{t('community.title')}</h1>
        <p className="mb-8 text-lg opacity-80">{t('community.description')}</p>
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

export default Community;

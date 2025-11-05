import React from 'react';
import { useTranslation } from 'react-i18next';

const posts = [
  {
    key: 'solid',
    title: 'learning.posts.solid.title',
    desc: 'learning.posts.solid.desc',
    img: '/posts/SOLID-Principles/SOLID-1.png',
    color: 'orange',
    link: '/community#solid',
  },
  {
    key: 'triple',
    title: 'learning.posts.triple.title',
    desc: 'learning.posts.triple.desc',
    img: '/posts/Triple Constraint/TC-1.png',
    color: 'teal',
    link: '/community#triple',
  },
  {
    key: 'bigo',
    title: 'learning.posts.bigo.title',
    desc: 'learning.posts.bigo.desc',
    img: '/posts/Big-O/Big-O-1.png',
    color: 'blue',
    link: '/community#bigo',
  },
];

const FeaturedPosts: React.FC = () => {
  const { t } = useTranslation();
  return (
      <section className="py-40 bg-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:gap-12 mb-10">
          <div className="flex-1">
            <h3 id="learning-section-title" className="text-6xl font-medium text-left mb-8 text-gray-800">
              {(() => {
                const title = t('learning.title');
                const [first, ...rest] = title.split(' ');
                return <><span className="font-bold">{first}</span>{rest.length ? ' ' + rest.join(' ') : ''}</>;
              })()}
            </h3>
            <p className="text-3xl text-left text-gray-800 learning-text mb-6 font-semibold">
              {t('learning.subTitle')}
            </p>
             <p className="text-2xl text-left text-gray-800 learning-text mb-6">{t('learning.explanation')}</p>
          </div>
          <div className="flex-shrink-0">
            {(() => {
              const topics = t('learning.topics', { returnObjects: true }) as string[];
              return Array.isArray(topics) ? (
                  <ul className="list-disc list-inside text-left text-gray-800 learning-text min-w-[240px] text-2xl mt-4">
                  {topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-left text-white">{t('learning.topics')}</p>
              );
            })()}
          </div>
        </div>
        <div className="flex flex-row gap-8 justify-center items-stretch">
          {posts.map((post) => (
            <div
              key={post.key}
              className="card card-hover w-[32rem] bg-white rounded-xl shadow-lg flex flex-col items-center transition-all duration-500"
              style={{padding: 0}}
            >
              <img src={post.img} alt={post.title} className="w-full object-cover rounded-t-xl shadow-xl" style={{marginTop: 0, marginBottom: 0}} />
              <p className="text-base opacity-80 mb-2 text-center text-gray-700 learning-text pt-6">{t(post.desc)}</p>
              <a href={post.link} className="text-orange-600 font-semibold hover:underline pb-6">{t('learning.exploreMore')}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;

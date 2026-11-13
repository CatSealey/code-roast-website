import React from 'react';
import { useTranslation } from 'react-i18next';
import Brews from './Brews';

const Intro: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="intro" className="relative">
      <div className="intro-brews-intro bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="intro-brews-heading">
            <p className="intro-brews-eyebrow">{t('intro.eyebrow')}</p>
            <h2 id="section-one-title">{t('intro.title')}</h2>
            <p className="intro-brews-lead">{t('intro.summary')}</p>
            <p className="intro-brews-copy">{t('intro.brewDescription')}</p>
          </div>
          <div className="intro-brews-topics" aria-label={t('intro.topicsLabel')}>
            <span>{t('intro.topicCode')}</span>
            <span>{t('intro.topicData')}</span>
            <span>{t('intro.topicBusiness')}</span>
            <span>{t('intro.topicCommunity')}</span>
          </div>
        </div>
      </div>
      <Brews />
    </section>
  );
};

export default Intro;

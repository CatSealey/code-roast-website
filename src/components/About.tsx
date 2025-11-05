
import React from 'react';
import { useTranslation } from 'react-i18next';


const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-40 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 id="section-three-title" className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('about.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h4 className="card-title">{t('about.missionTitle')}</h4>
              </div>
              <div className="card-content">
                {t('about.missionDesc')}
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <h4 className="card-title">{t('about.valuesTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.valuesCuriosity')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('about.valuesCraft')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.valuesClarity')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('about.valuesCommunity')}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <h4 className="card-title">{t('about.howWeWorkTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.howWeWorkCollaborate')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('about.howWeWorkContribute')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.howWeWorkCreate')}</span></li>
                </ul>
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                <h4 className="card-title">{t('about.invitationTitle')}</h4>
              </div>
              <div className="card-content">
                {t('about.invitationDesc')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


import React from 'react';
import { useTranslation } from 'react-i18next';


const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 id="section-three-title" className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('about.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h4 className="card-title">{t('about.statisticalTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div>{t('about.statisticalRegression')}</div></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div>{t('about.statisticalHypothesis')}</div></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div>{t('about.statisticalTimeSeries')}</div></li>
                </ul>
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <h4 className="card-title">{t('about.mlTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.mlSupervised')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('about.mlUnsupervised')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.mlClustering')}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <h4 className="card-title">{t('about.miningTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.miningAssociation')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('about.miningClassification')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('about.miningAnomaly')}</span></li>
                </ul>
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                <h4 className="card-title">{t('about.visualizationTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div>{t('about.visualizationExploratory')}</div></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div>{t('about.visualizationExplanatory')}</div></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div>{t('about.visualizationDashboard')}</div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 card card-hover">
          <div className="card-header">
            <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <h4 className="card-title">{t('about.processTitle')}</h4>
          </div>
          <div className="process-steps">
            <div className="process-step"><div className="process-disk">1</div><h5 className="process-step-title">{t('about.processDefine')}</h5><p className="process-step-description">{t('about.processDefineDesc')}</p></div>
            <div className="process-step"><div className="process-disk">2</div><h5 className="process-step-title">{t('about.processCollect')}</h5><p className="process-step-description">{t('about.processCollectDesc')}</p></div>
            <div className="process-step"><div className="process-disk">3</div><h5 className="process-step-title">{t('about.processClean')}</h5><p className="process-step-description">{t('about.processCleanDesc')}</p></div>
            <div className="process-step"><div className="process-disk">4</div><h5 className="process-step-title">{t('about.processAnalyze')}</h5><p className="process-step-description">{t('about.processAnalyzeDesc')}</p></div>
            <div className="process-step"><div className="process-disk">5</div><h5 className="process-step-title">{t('about.processInterpret')}</h5><p className="process-step-description">{t('about.processInterpretDesc')}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

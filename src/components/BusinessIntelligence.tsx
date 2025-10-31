
import React from 'react';
import { useTranslation } from 'react-i18next';


const BusinessIntelligence: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 id="section-two-title" className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('bi.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
                <h4 className="card-title">{t('bi.understandingTitle')}</h4>
              </div>
              <div className="card-content">
                {t('bi.understandingDesc')}
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <h4 className="card-title">{t('bi.coreTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('bi.coreWarehousing')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('bi.coreETL')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('bi.coreOLAP')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('bi.coreReporting')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('bi.coreDashboards')}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
                <h4 className="card-title">{t('bi.vsTitle')}</h4>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="feature-item"><div className="feature-dot feature-dot--primary"></div><div>{t('bi.vsTraditional')}</div></div>
                  <div className="feature-item"><div className="feature-dot feature-dot--accent"></div><div>{t('bi.vsBI')}</div></div>
                </div>
              </div>
            </div>
            <div className="card card-hover">
              <div className="card-header">
                <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                <h4 className="card-title">{t('bi.keyTitle')}</h4>
              </div>
              <div className="card-content">
                <ul className="feature-list">
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('bi.keyIntegration')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span>{t('bi.keyMonitoring')}</span></li>
                  <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span>{t('bi.keyPlanning')}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIntelligence;

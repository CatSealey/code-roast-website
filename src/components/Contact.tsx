
import React from 'react';
import { useTranslation } from 'react-i18next';


const Contact: React.FC = () => {
  const { t } = useTranslation();
  const subject = encodeURIComponent(t('contact.emailSubject'));
  const body = encodeURIComponent(t('contact.emailBody'));
  return (
    <section id="contact" className="py-40 gradient-bg text-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-8">{t('contact.title')}</h3>
        <p className="text-xl mb-8 opacity-90" style={{ whiteSpace: 'pre-line' }}>
          {t('contact.description')}
        </p>
        <a href={`mailto:code.roast.support@gmail.com?subject=${subject}&body=${body}`} className="btn btn-secondary morphing-button bg-white">
          {t('contact.cta')}
        </a>
      </div>
    </section>
  );
};

export default Contact;

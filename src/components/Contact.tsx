
import React from 'react';
import { useTranslation } from 'react-i18next';


const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-40 gradient-bg text-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-8">{t('contact.title')}</h3>
        <p className="text-xl mb-8 opacity-90">
          {t('contact.description')}
        </p>
        <button className="btn btn-secondary morphing-button bg-white">
          {t('contact.cta')}
        </button>
      </div>
    </section>
  );
};

export default Contact;

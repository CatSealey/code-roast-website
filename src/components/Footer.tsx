import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-teal-950 text-white py-3">
      <div className="container mx-auto px-5 text-center">
        <p id="footer-text" className="mb-0">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;

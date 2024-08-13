import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/Translate/LanguageSelector';

const LandingPage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="landing-page">
      
      <div className="hero-section">
        <h1>{t("app.header")}</h1>
        <p>{t("app.description")}</p>
        <Link to="/books" className="btn-primary">
          {t("app.start")}
        </Link>
        <div className="features-section">
          <h2>{t("app.why")}</h2>
          <ul>
            <li>{t("app.wide")}</li>
            <li>{t("app.exclusive")}</li>
            <li>{t("app.fast")}</li>
          </ul>
        </div>
        <span>View Page in</span>
        <LanguageSelector />
      </div>
      
      <div className="footer">
        
      </div>
    </div>
  );
};

export default LandingPage;
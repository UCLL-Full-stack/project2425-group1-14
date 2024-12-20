// components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <footer className="footer-container">
            <div className="footer-inner-container">
                <p className="footer-text">© 2024 Hannọ</p>
                <div className="footer-legal-links">
                    <a href="/source" className="footer-link">
                        Source
                    </a>{' '}
                    |{' '}
                    <a href="/license" className="footer-link">
                        License
                    </a>
                </div>
                <div className="footer-language-switcher">
                    <button onClick={() => handleLanguageChange('en')}>English</button>
                    <button onClick={() => handleLanguageChange('nl')}>Nederlands</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

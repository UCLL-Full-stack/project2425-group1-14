// components/LanguageSwitcher.tsx
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div>
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('nl')}>Nederlands</button>
        </div>
    );
};

export default LanguageSwitcher;

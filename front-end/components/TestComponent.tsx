import { useTranslation } from 'react-i18next';

const TestComponent = () => {
    const { i18n, t } = useTranslation();

    return (
        <div>
            <p>{t('common:welcome')}</p>
            <button onClick={() => i18n.changeLanguage('en')}>English</button>
            <button onClick={() => i18n.changeLanguage('nl')}>Dutch</button>
        </div>
    );
};

export default TestComponent;

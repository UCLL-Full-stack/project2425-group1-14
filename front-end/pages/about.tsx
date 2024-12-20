import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container">
            <Header />

            <main>
                <section className="blurb">
                    <h1>{t('about:aboutUs')}</h1>
                    <p className="date">{t('about:lastUpdated', { date: 'November 2024' })}</p>
                </section>

                <section>
                    <h2>{t('about:whoAreWe')}</h2>
                    <p>{t('about:ourTeamDescription')}</p>
                </section>

                <section>
                    <h2>{t('about:ourStory')}</h2>
                    <p>{t('about:ourStoryDescription')}</p>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['about', 'common'], nextI18NextConfig)),
        },
    };
};

export default AboutPage;

import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config'; // Pad aanpassen indien nodig

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <Header />

      <main>
        <section className="blurb">
          <h1>{t('contact:contactUs')}</h1>
          <p className="date">{t('contact:lastUpdated', { date: 'November 2024' })}</p>
        </section>

        <section>
          <h2>{t('contact:getInTouch')}</h2>
          <p>{t('contact:description')}</p>

          <br />

          <div className="contactCard">
            <div>
              <p>
                <strong>{t('contact:saperoi')}</strong>
              </p>
              <ul>
                <li>
                  <strong>{t('contact:github')}:</strong> saperoi
                </li>
                <li>
                  <strong>{t('contact:email')}:</strong> sapero@icosahedr.online
                </li>
              </ul>
            </div>
            <div>
              <p>
                <strong>{t('contact:jackVanHecke')}</strong>
              </p>
              <ul>
                <li>
                  <strong>{t('contact:github')}:</strong> JackvanHecke
                </li>
                <li>
                  <strong>{t('contact:email')}:</strong> jack.vanhecke@ucll.be
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['contact', 'common'], nextI18NextConfig)),
    },
  };
};

export default ContactPage;

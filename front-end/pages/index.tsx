import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import nextI18NextConfig from '../next-i18next.config'; // Pad aanpassen indien nodig

import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const IndexPage: React.FC = () => {
  const { t } = useTranslation();  // Haal de vertaalfunctie op
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('fade-in');
    }

    const savedName = window.localStorage.getItem("name");
    if (savedName) {
      setLoggedInUser(savedName);
    }

    return () => {
      if (body) {
        body.classList.remove('fade-in');
      }
    };
  }, []);

  const getButtonTextAndLink = () => {
    if (loggedInUser === "testadmin") {
      return { text: t("index:adminPanel"), link: "/admin" }; // Vertaalde tekst voor de knop
    } else if (loggedInUser === "testvoter") {
      return { text: t("index:voteHere"), link: "/voter" }; // Vertaalde tekst voor de knop
    } else {
      return { text: t("index:loginAndVote"), link: "/login" }; // Vertaalde tekst voor de knop
    }
  };

  const { text, link } = getButtonTextAndLink();

  return (
    <div className="index-container">
      <Header />
      <main className="index-content">
        <h2 className="index-heading">{t("index:welcomeMessage")}</h2> {/* Vertaalde header */}
        <button
          className="index-voteButton"
          onClick={() => window.location.href = link}
        >
          {text}
        </button>
        <br />
        <div>
          <h3>{t("index:testLogins")}</h3> {/* Vertaalde subkopje */}
          <table className="index-loginTable">
            <thead>
              <tr>
                <th>{t("index:username")}</th> {/* Vertaalde tekst */}
                <th>{t("index:password")}</th> {/* Vertaalde tekst */}
                <th>{t("index:role")}</th> {/* Vertaalde tekst */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>testadmin</td>
                <td>admin</td>
                <td>admin</td>
              </tr>
              <tr>
                <td>testmanager</td>
                <td>manager</td>
                <td>manager</td>
              </tr>
              <tr>
                <td>testvoter</td>
                <td>voter</td>
                <td>voter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['index', 'common'])),
    },
  };
};

export default IndexPage;

import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const IndexPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('fade-in');
    }

    // Controleer of een gebruiker is ingelogd
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
      return { text: "Admin Panel", link: "/admin" };
    } else if (loggedInUser === "testvoter") {
      return { text: "Vote Here", link: "/voter" };
    } else {
      return { text: "Log in and Vote Here", link: "/login" };
    }
  };

  const { text, link } = getButtonTextAndLink();

  const handleButtonClick = () => {
    setShowFireworks(true);

    // Stop de animatie na 3 seconden
    setTimeout(() => {
      setShowFireworks(false);
      window.location.href = link; // Navigeren na de animatie
    }, 3000);
  };

  return (
    <div className="index-container">
      <Header />
      <main className="index-content">
        <h2 className="index-heading">Welcome to Hannọ</h2>
        <button
          className="index-voteButton"
          onClick={handleButtonClick}
        >
          {text}
        </button>

        {showFireworks && (
          <div className="fireworks-container">
            <div className="firework firework1"></div>
            <div className="firework firework2"></div>
            <div className="firework firework3"></div>
          </div>
        )}

        <br />
        <div>
          <h3>TEST LOG-INS</h3>
          <table className="index-loginTable">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>PASSWORD</th>
                <th>ROLE</th>
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

export default IndexPage;

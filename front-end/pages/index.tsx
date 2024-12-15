import React, { useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const IndexPage: React.FC = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('fade-in');
    }

    return () => {
      if (body) {
        body.classList.remove('fade-in');
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.contentContainer}>
        <h2 style={styles.heading}>Welcome to Hannọ</h2>
        <button
          style={styles.voteButton}
          onClick={() => window.location.href = '/login'}
        >
          Log in and Vote Here
        </button>
        <br></br>
        <div>
            <h3>TEST LOG-INS</h3>
            <table>
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

const styles: Object & { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ffffff, #e0f7fa)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
    padding: '20px',
  },
  heading: {
    color: '#333',
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: '600',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 2s ease-in-out',
  },
  voteButton: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
};

export default IndexPage;

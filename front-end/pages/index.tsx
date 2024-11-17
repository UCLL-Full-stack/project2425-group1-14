import React, { useEffect, useState } from 'react';

const IndexPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div style={{ textAlign: 'center', height: '100vh', backgroundColor: 'white', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
        <div>{currentTime}</div>
        <div>
          <button onClick={() => window.location.href = '/admin'}>Admin</button>
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 50px)' }}>
        <h2 style={{ color: 'black', fontSize: '3rem' }}>Welcome to the Voting App</h2>
        <button
          style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', fontSize: '1.5rem', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
          onClick={() => window.location.href = '/voter'}
        >
          Vote Here
        </button>
      </div>
      <footer style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: 'gray' }}>
        © 2024 Voting App
      </footer>
    </div>
  );
};

export default IndexPage;

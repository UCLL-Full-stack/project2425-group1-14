import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div style={headerStyles.container}>

        </div>
    );
};

const VotingPage: React.FC = () => {
    const [vote, setVote] = useState<string | null>(null);

    const handleVote = (option: string) => {
        setVote(option);
        // backend callen 
    };

    return (
        <div style={styles.container}>
            <Header />
            <h1 style={{ ...styles.header, padding: '20px' }}>Vote here</h1>
            <p style={{ textAlign: 'left', fontSize: '1.2em', marginBottom: '20px', border: '1px solid #ccc', padding: '10px', color: 'black' }}>Select a party</p>
            <div style={{ ...styles.buttonContainer, display: 'flex', justifyContent: 'right', padding: '20px' }}>

                <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', marginBottom: '20px', color: 'black' }}>
                        <input type="radio" name="vote" onChange={() => handleVote('Party 1')} style={{ marginRight: '10px' }} />
                        Party 1
                    </label>
                    <label style={{ display: 'block', marginBottom: '20px', color: 'black' }}>
                        <input type="radio" name="vote" onChange={() => handleVote('Party 2')} style={{ marginRight: '10px' }} />
                        Party 2
                    </label>
                    <label style={{ display: 'block', marginBottom: '20px', color: 'black' }}>
                        <input type="radio" name="vote" onChange={() => handleVote('Party 3')} style={{ marginRight: '10px' }} />
                        Party 3
                    </label>
                </div>
            </div>
            <button style={{ ...styles.button, borderRadius: '10px' }}>Submit</button>
            {vote && <p style={styles.voteText}>You voted for: {vote}</p>}
        </div >
    );
};

const headerStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#0070f3',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2em',
    },
};

const styles = {
    container: {
        textAlign: 'center' as const,
        marginTop: '0',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: '2em',
        color: '#333',
    },
    buttonContainer: {
        margin: '20px',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '1em',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#0070f3',
        color: '#000',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#005bb5',
    },
    voteText: {
        fontSize: '1.2em',
        color: '#0070f3',
    },
    linkContainer: {
        marginTop: '20px',
    },
    link: {
        color: '#0070f3',
        textDecoration: 'none',
        fontSize: '1em',
    },
};

export default VotingPage;

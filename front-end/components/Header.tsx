import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>('User');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={headerStyles.container}>
            <div style={headerStyles.linksContainer}>
                <Link href="/" style={headerStyles.link}>Home</Link>
                <Link href="/about" style={headerStyles.link}>About</Link>
                <Link href="/contact" style={headerStyles.link}>Contact</Link>
            </div>

            <div style={headerStyles.userInfoContainer}>
                <span style={headerStyles.loggedInText}>Logged in as {loggedInUser}</span>
                <Link href="/profile" style={headerStyles.link}>
                    <button style={headerStyles.profileButton}>Profile Settings</button>
                </Link>
            </div>

            <div style={headerStyles.timerContainer}>
                <span style={headerStyles.timer}>{currentTime}</span>
            </div>
        </div>
    );
};

const headerStyles: Object & { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    linksContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2em',
        transition: 'color 0.3s ease, text-decoration 0.3s ease',
    },
    userInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    loggedInText: {
        fontSize: '1em',
    },
    profileButton: {
        padding: '5px 15px',
        fontSize: '1em',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#005bb5',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    timerContainer: {
        fontSize: '1.2em',
        fontWeight: 'lighter' as const,
    },
    timer: {
        fontSize: '1.5em',
    },
};

export default Header;


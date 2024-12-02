import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div style={headerStyles.container}>

            <div style={headerStyles.linksContainer}>
                <Link href="/" style={headerStyles.link}>Hannọ</Link>
            </div>
            <div style={headerStyles.contactButtonContainer}>
                <Link href="/contact" style={headerStyles.contactButton}>Contact Us</Link>
            </div>
        </div>
    );
};

const headerStyles: Object & { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
    },
    linksContainer: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 'bold',
        transition: 'color 0.3s ease, text-decoration 0.3s ease',
    },
    contactButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '20px',
    },
    contactButton: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1em',
        padding: '5px 10px',
        backgroundColor: '#005bb5',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
};

export default Header;
import React from 'react';

const Footer: React.FC = () => {
    return (
        <div style={footerStyles.container}>
            <div style={footerStyles.innerContainer}>

                <p style={footerStyles.text}>© 2024 Hanno. All rights reserved.</p>


                <div style={footerStyles.legalLinks}>
                    <a href="/privacy-policy" style={footerStyles.link}>
                        Privacy Policy
                    </a> |{' '}
                    <a href="/terms-of-service" style={footerStyles.link}>
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    );
};

const footerStyles = {
    container: {
        padding: '20px 10px',
        backgroundColor: '#0070f3',
        textAlign: 'center' as const,
        position: 'relative' as const,
        bottom: 0,
        width: '100%',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    innerContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    text: {
        margin: '10px 0',
        fontSize: '1em',
        fontWeight: 'lighter' as const,
    },
    legalLinks: {
        marginTop: '10px',
        fontSize: '0.9em',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        transition: 'color 0.3s ease, text-decoration 0.3s ease', //  transition ding
    },
    linkHover: {
        color: '#005bb5', // Darker blue on hover
        textDecoration: 'underline', // Underline on hover
    },
};

//  hover effects to the links
const handleHover = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.style) {
        target.style.color = '#005bb5';
        target.style.textDecoration = 'underline';
    }
};

const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.style) {
        target.style.color = '#fff';
        target.style.textDecoration = 'none';
    }
};

const legalLinks = (
    <div style={footerStyles.legalLinks}>
        <a
            href="/privacy-policy"
            style={footerStyles.link}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
        >
            Privacy Policy
        </a>{' '}
        |{' '}
        <a
            href="/terms-of-service"
            style={footerStyles.link}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
        >
            Terms of Service
        </a>
    </div>
);

export default Footer;

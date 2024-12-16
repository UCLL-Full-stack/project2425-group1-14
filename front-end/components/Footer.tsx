import React from 'react';


const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-inner-container">
                <p className="footer-text">© 2024 Hannọ</p>
                <div className="footer-legal-links">
                    <a href="/source" className="footer-link">
                        Source
                    </a>{' '}
                    |{' '}
                    <a href="/license" className="footer-link">
                        License
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

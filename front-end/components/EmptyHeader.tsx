import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <div className="header-container">
            <div className="header-links-container">
                <Link href="/" className="header-link">Hannọ</Link>
            </div>
            <div className="header-contact-button-container">
                <Link href="/contact" className="header-contact-button">Contact Us</Link>
            </div>
        </div>
    );
};

export default Header;

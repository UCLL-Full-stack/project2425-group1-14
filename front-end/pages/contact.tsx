import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const ContactPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <div style={styles.blurb}>
                    <h1 style={styles.title}>Contact Us</h1>
                    <p style={styles.date}>Last updated: November 2024</p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Get in Touch</h2>
                    <p style={styles.sectionText}>
                        We would love to hear from you! Whether you have a question, feedback, or would like to collaborate with us, feel free to reach out via the contact details below.
                    </p>

                    <p style={styles.sectionText}>
                        You can reach us via email or via our GitHubs:
                    </p>
                    <section style={styles.sectionText}>
                        <p><strong>Saperoi</strong></p>
                        <ul>
                            <li><strong>Github:</strong> saperoi</li>
                            <li><strong>Email:</strong> sapero@icosahedr.online</li>
                        </ul>
                    </section>
                    <section style={styles.sectionText}>
                        <p><strong>Jack van Hecke</strong></p>
                        <ul>
                            <li><strong>Github:</strong> JackvanHecke</li>
                        </ul>
                    </section>

                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles: Object & { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    blurb: {
      textAlign: "center"
    },
    content: {
        marginTop: '20px',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '30px',
        color: '#222',
        textTransform: 'uppercase',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    date: {
        fontSize: '1rem',
        marginBottom: '30px',
        color: '#888',
    },
    section: {
        marginBottom: '30px',
        backgroundColor: '#d9d9d9',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    sectionText: {
        fontSize: '1.1rem',
        lineHeight: '1.4',
        color: '#000',
    },
    mapContainer: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    map: {
        border: 'none',
        borderRadius: '8px',
    },
    list: {
        marginTop: '10px',
        marginLeft: '20px',
        listStyleType: 'disc',
    },
    listItem: {
        fontSize: '1.1rem',
        color: '#333',
        marginBottom: '10px',
    },
};

export default ContactPage;

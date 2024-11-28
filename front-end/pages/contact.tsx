import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <h1 style={styles.title}>Contact Us</h1>
                <p style={styles.date}>Last updated: November 2024</p>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Location</h2>
                    <p style={styles.sectionText}>
                        We are located at the University Colleges Leuven-Limburg (UCLL). Feel free to stop by for any inquiries or just to say hello!
                    </p>

                    {/* Embed Google Map */}
                    <div style={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.3404389650576!2d4.703347383345253!3d50.879258374710015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3d9bbbf4ba5d5%3A0x4d2ed75f0c19c9a5!2sCampus%20Proximus!5e0!3m2!1sen!2sbe!4v1686278751042!5m2!1sen!2sbe&marker=50.879258374710015,4.703347383345253"
                            width="100%"
                            height="450"
                            style={styles.map}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />


                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Get in Touch</h2>
                    <p style={styles.sectionText}>
                        We would love to hear from you! Whether you have a question, feedback, or would like to collaborate with us, feel free to reach out via the contact details below.
                    </p>
                    <p style={styles.sectionText}>
                        You can reach us via email or our physical office address:
                    </p>
                    <p style={styles.sectionText}>
                        <strong>Email:</strong> support@hannoapp.com
                    </p>
                    <p style={styles.sectionText}>
                        <strong>Address:</strong> UCLL Heverlee Campus, 1234 Voting Lane, Suite 101, Leuven, Belgium
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Office Hours</h2>
                    <p style={styles.sectionText}>
                        Our office is open during the following hours:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            Monday to Friday: 9:00 AM - 6:00 PM
                        </li>
                        <li style={styles.listItem}>
                            Saturday: Closed
                        </li>
                        <li style={styles.listItem}>
                            Sunday: Closed
                        </li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    content: {
        marginTop: '20px',
    },
    title: {
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '30px',
        color: '#222',
        textTransform: 'uppercase',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    date: {
        textAlign: 'center',
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

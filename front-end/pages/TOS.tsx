import React from 'react';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <h1 style={styles.title}>Privacy Policy for Hanno Voting App</h1>
                <p style={styles.date}>Last updated: November 2024</p>

                <div style={styles.section}>
                    <h2>Introduction</h2>
                    <p style={styles.sectionText}>
                        Welcome to Hanno, a secure and user-friendly voting platform. This Privacy Policy describes how we collect, use, and protect your personal data when you use our services. By using Hanno, you agree to the practices outlined in this policy.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>1. Information We Collect</h2>
                    <p style={styles.sectionText}>
                        We collect several types of information to provide and improve our services. This includes:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Personal Information:</strong> When you register or log in, we may collect your name, email address, and other contact information.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Usage Data:</strong> We collect information about how you interact with our services, including IP addresses, device information, browser type, and pages visited.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and collect data on how you use the app.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2>2. How We Use Your Information</h2>
                    <p style={styles.sectionText}>
                        The information we collect is used in the following ways:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>To provide, personalize, and improve your experience on Hanno.</li>
                        <li style={styles.listItem}>To communicate with you about account updates, voting processes, and important notifications.</li>
                        <li style={styles.listItem}>To analyze usage patterns to improve the performance of the app.</li>
                        <li style={styles.listItem}>To send you promotional materials, if you've opted in to receive such communications.</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2>3. Data Retention</h2>
                    <p style={styles.sectionText}>
                        We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When the information is no longer needed, we will delete or anonymize it.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>4. Sharing Your Information</h2>
                    <p style={styles.sectionText}>
                        We do not sell, rent, or trade your personal information to third parties. However, we may share information in the following situations:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Service Providers:</strong> We may share your data with third-party vendors who assist in providing services such as hosting, analytics, and marketing.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect our rights, property, or safety, or that of others.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2>5. Data Security</h2>
                    <p style={styles.sectionText}>
                        We take reasonable measures to protect the personal information you provide, including using encryption and secure data storage methods. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>6. Your Rights</h2>
                    <p style={styles.sectionText}>
                        You have the following rights regarding your personal data:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Access:</strong> You have the right to request a copy of the personal data we hold about you.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information we have about you.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Deletion:</strong> You can request that we delete your personal data under certain circumstances.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Opt-out:</strong> You may opt out of receiving marketing communications from us at any time.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2>7. International Data Transfers</h2>
                    <p style={styles.sectionText}>
                        If you are accessing our services from outside the United States, please note that your information may be transferred to, stored, and processed in a different country. We will take all reasonable steps to ensure your information is handled securely.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>8. Children's Privacy</h2>
                    <p style={styles.sectionText}>
                        Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected personal information from a child under 13, we will take steps to delete such information.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>9. Changes to This Privacy Policy</h2>
                    <p style={styles.sectionText}>
                        We may update this Privacy Policy from time to time. If we make any changes, we will notify you by posting the updated policy on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your data.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2>10. Contact Us</h2>
                    <p style={styles.sectionText}>
                        If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <p style={styles.sectionText}>
                        Email: support@hannoapp.com
                    </p>
                    <p style={styles.sectionText}>
                        Address: 1234 Voting Lane, Suite 101, City, State, 12345
                    </p>
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

export default PrivacyPolicy;

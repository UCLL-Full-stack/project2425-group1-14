import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />
            <h1 style={styles.title}>Privacy Policy for Hanno</h1>
            <p style={styles.date}>Last Updated: November 2024</p>

            <section style={styles.section}>
                <h2>1. Introduction</h2>
                <p>
                    Hanno ("we," "our," or "us") provides a secure and efficient voting platform for users to participate in various polls and elections. This Privacy Policy applies to all users ("you" or "your") of the Hanno voting app ("the App") available on various devices, including but not limited to mobile phones, tablets, and desktops.
                </p>
                <p>
                    By using our App, you agree to the collection and use of your information in accordance with this policy. If you do not agree with this policy, please do not use the App.
                </p>
            </section>

            <section style={styles.section}>
                <h2>2. Information We Collect</h2>
                <p>We collect several types of information for various purposes to provide and improve our services. The types of information we may collect include:</p>

                <h3>2.1 Personal Data</h3>
                <p>
                    Personal data refers to any information that identifies you directly or indirectly. When you register or use our services, we may collect the following personal data:
                </p>
                <ul>
                    <li>Full Name: To identify you within the system.</li>
                    <li>Email Address: To communicate with you regarding the voting process or updates.</li>
                    <li>Phone Number: For two-factor authentication or notifications related to voting.</li>
                    <li>Date of Birth: To ensure eligibility to vote based on age restrictions.</li>
                </ul>

                <h3>2.2 Usage Data</h3>
                <p>
                    We may also collect information about how you access and use the App. This may include:
                </p>
                <ul>
                    <li>Device Information: Information about the device you use to access the App, including IP address, device type, operating system, browser type, and version.</li>
                    <li>Log Data: This includes information such as time and date of your use, error logs, and other diagnostic data.</li>
                    <li>Geolocation Data: If you grant permission, we may collect your location for certain features, such as location-based voting restrictions.</li>
                </ul>

                <h3>2.3 Cookies and Tracking Technologies</h3>
                <p>
                    We use cookies and similar tracking technologies to track activity on our App and store certain information. Cookies are small files that are stored on your device and help us provide a better user experience. The cookies we use include:
                </p>
                <ul>
                    <li>Session Cookies: To operate our App efficiently during your session.</li>
                    <li>Preference Cookies: To remember your preferences and settings.</li>
                    <li>Analytical Cookies: To collect information about usage patterns and enhance our services.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2>3. How We Use Your Information</h2>
                <p>
                    We use the collected information for various purposes, including:
                </p>
                <ul>
                    <li>Providing Services: To register and authenticate users, facilitate the voting process, and manage user accounts.</li>
                    <li>Improving the App: To analyze user behavior and optimize the app's performance, usability, and functionality.</li>
                    <li>Communication: To send you important updates, notifications, and promotional material related to Hanno. You can opt-out of promotional communications at any time.</li>
                    <li>Legal Compliance: To comply with legal obligations and ensure the integrity of voting processes.</li>
                    <li>Security: To monitor and enhance the security of our services, prevent fraudulent activity, and protect against unauthorized access.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2>4. Sharing Your Information</h2>
                <p>
                    We do not sell, rent, or share your personal data with third parties except as described in this policy. We may share your information in the following cases:
                </p>
                <ul>
                    <li>With Service Providers: We may share your information with third-party service providers who perform services for us, such as hosting, data storage, and analytics. These providers are bound by confidentiality agreements and are only permitted to use your data for the purpose of providing services to Hanno.</li>
                    <li>For Legal Purposes: We may disclose your personal data if required to do so by law or in response to valid legal requests by public authorities, including to meet national security or law enforcement requirements.</li>
                    <li>In Business Transactions: In the event of a merger, acquisition, or sale of assets, your personal data may be transferred. We will notify you of any such changes and the privacy policy governing the new entity.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2>5. Data Security</h2>
                <p>
                    We take the security of your personal data seriously and implement reasonable technical and organizational measures to protect it. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p>
                    Some of the security measures we take include:
                </p>
                <ul>
                    <li>Encryption: We use industry-standard encryption protocols (such as SSL/TLS) to protect data in transit.</li>
                    <li>Access Control: We limit access to personal data to authorized personnel only.</li>
                    <li>Regular Audits: We conduct regular security audits and vulnerability assessments to identify and mitigate potential risks.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2>6. Data Retention</h2>
                <p>
                    We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Once the data is no longer needed, we securely delete or anonymize it.
                </p>
            </section>

            <section style={styles.section}>
                <h2>7. Your Rights</h2>
                <p>
                    As a user of Hanno, you have several rights regarding your personal data, including:
                </p>
                <ul>
                    <li>Right to Access: You have the right to request access to the personal data we hold about you and obtain a copy of it.</li>
                    <li>Right to Rectification: If you believe that any of your personal data is inaccurate or incomplete, you have the right to request correction or updates.</li>
                    <li>Right to Erasure: You have the right to request the deletion of your personal data, subject to certain exceptions.</li>
                    <li>Right to Restriction: You may request the restriction of the processing of your personal data under certain circumstances.</li>
                    <li>Right to Data Portability: You have the right to request a copy of your personal data in a machine-readable format.</li>
                    <li>Right to Object: You have the right to object to the processing of your personal data for direct marketing purposes.</li>
                </ul>
                <p>
                    To exercise any of these rights, please contact us at [insert contact email or link to privacy contact form].
                </p>
            </section>

            <section style={styles.section}>
                <h2>8. Children’s Privacy</h2>
                <p>
                    Hanno does not knowingly collect or solicit personal data from anyone under the age of 13. If we learn that we have collected personal data from a child under age 13 without verification of parental consent, we will delete that information as soon as possible.
                </p>
            </section>

            <section style={styles.section}>
                <h2>9. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we update the policy, we will revise the "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
            </section>

            <section style={styles.section}>
                <h2>10. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at:
                </p>
                <p>
                    **Hanno Support Team**<br />
                    Email: [nog doen]<br />
                    Phone: [nog doen]<br />
                    Address: [nog doen]
                </p>
            </section>
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
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: 'black',
    },
    date: {
        textAlign: 'center',
        fontSize: '1rem',
        marginBottom: '20px',
        color: 'black',
    },
    section: {
        marginBottom: '20px',
        color: 'black',
    },
};

export default PrivacyPolicy;

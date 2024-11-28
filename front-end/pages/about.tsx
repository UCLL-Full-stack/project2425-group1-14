import React from 'react';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component

const AboutPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.date}>Last updated: November 2024</p>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Story</h2>
                    <p style={styles.sectionText}>
                        We were just a group of 2C students at UCLL (University Colleges Leuven-Limburg), working on a project for our final semester. Initially, our goal was simple: to create an easy-to-use platform for voting. Little did we know that our project would turn into something much bigger, something that would change the way people vote, making the process faster, easier, and more accessible to everyone.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>From Classroom Project to Global Initiative</h2>
                    <p style={styles.sectionText}>
                        What started as a small class assignment turned into an exciting venture. As we continued to develop the Hanno Voting App, it became clear that this platform had potential far beyond a classroom project. The idea was simple: make voting accessible to all, especially in a digital-first world where people are looking for more streamlined solutions.
                    </p>
                    <p style={styles.sectionText}>
                        We began sharing the concept with our professors, peers, and later some professionals in the tech industry. Before we knew it, our project caught the attention of various companies, investors, and even government officials. They saw the promise in our idea and the dedication we put into creating a platform that could be used by anyone, anywhere.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>The Rise of Hanno</h2>
                    <p style={styles.sectionText}>
                        Thanks to the support of these early sponsors, we were able to take the Hanno Voting App to the next level. We expanded our team, gained access to resources, and worked tirelessly to improve the platform. As more sponsors came on board, the app began to evolve, not just as a tool for voting, but as a reliable, secure, and transparent solution for democratic processes in all kinds of industries.
                    </p>
                    <p style={styles.sectionText}>
                        Today, the Hanno Voting App is used globally, from political elections to corporate decision-making processes. Its accessibility, security features, and user-friendly design have made it the preferred choice for organizations looking for innovative ways to engage their communities.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Mission</h2>
                    <p style={styles.sectionText}>
                        Our mission remains the same as when we started: to make voting as simple, secure, and accessible as possible. We believe that the process of voting should be effortless, transparent, and inclusive for everyone, no matter where they are in the world or what background they come from.
                    </p>
                    <p style={styles.sectionText}>
                        In this age of digital transformation, it's important that we keep up with the times. By bringing innovation and technology to the forefront of voting, we have created a system that enables people to vote quickly, without compromising the integrity or security of the process. We are committed to continuously improving the Hanno Voting App, ensuring that it remains a leading solution in the world of digital democracy.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Global Impact</h2>
                    <p style={styles.sectionText}>
                        Today, our platform is used around the world in countries large and small. The success of the Hanno Voting App has proven that it is not just a tool for elections but a solution for organizations and communities seeking to make decision-making faster, easier, and more democratic.
                    </p>
                    <p style={styles.sectionText}>
                        We've seen its impact in government elections, private companies using it for internal decisions, universities adopting it for student votes, and even NGOs using it for community-driven projects. Our vision of creating a universal, accessible voting solution has come true, and we are proud of what we've accomplished.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Looking Ahead</h2>
                    <p style={styles.sectionText}>
                        We are only just getting started. With new technologies emerging every day, we are committed to evolving and staying ahead of the curve. Our goal is to continue providing solutions that not only make voting easy but also secure, transparent, and reliable. We have big plans for the future, including expanding the Hanno Voting App to even more regions and sectors, making it available to an even wider audience.
                    </p>
                    <p style={styles.sectionText}>
                        Whether it's improving the app's functionality or expanding its reach, we are dedicated to our mission of making voting accessible and seamless for everyone. We're excited to continue this journey, and we hope you'll be with us every step of the way.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Contact Us</h2>
                    <p style={styles.sectionText}>
                        If you'd like to learn more about Hanno, or if you're interested in partnering with us or becoming a sponsor, don't hesitate to reach out. We're always happy to connect with people who share our vision for a more accessible and democratic future.
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
        lineHeight: '1.3',
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

export default AboutPage;

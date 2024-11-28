import React from 'react';
import Header from '@components/Header'; // Import the Header component
import Footer from '@components/Footer'; // Import the Footer component

const AboutPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <section style={styles.blurb}>
                    <h1 style={styles.title}>About Us</h1>
                    <p style={styles.date}>Last updated: November 2024</p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Story</h2>
                    <p style={styles.sectionText}>
                        We are just a group of second-year students in university, working on a project for our third semester.
                        Our goal is simple: to create easy-to-use, self-hostable, and open software for voting.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Lorem ipsum dolor sit amet</h2>
                    <p style={styles.sectionText}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores corporis inventore rem debitis exercitationem. Omnis itaque dolorem veritatis reprehenderit sunt ullam officiis nulla, quod reiciendis, repudiandae odit repellat aspernatur quaerat sed iure vitae! Aut, omnis in. Modi, consequatur harum! Fugiat eius repellendus et dignissimos, laudantium voluptates autem? Amet pariatur ratione eveniet doloribus mollitia et praesentium sunt quaerat! Ullam vitae, explicabo blanditiis culpa, omnis, libero assumenda nulla dolorum facere itaque sed minima aliquam aut minus adipisci! Obcaecati quibusdam cupiditate itaque natus officiis aliquid labore earum ducimus cumque ea nesciunt, et repellat suscipit nemo dolorem unde amet eos inventore hic incidunt. Aperiam, aspernatur commodi! Voluptatum nobis hic consequuntur quas tempore laudantium sit nostrum saepe ea perspiciatis ipsa, quaerat praesentium asperiores, omnis placeat provident, officiis dolorum! Placeat, necessitatibus odio. Enim laboriosam laudantium nulla amet. Eveniet saepe numquam, nemo, amet quos explicabo cumque aliquam accusamus esse aliquid consequatur, perspiciatis ab tenetur molestias dolore tempore quia sint sequi asperiores culpa sapiente officia dicta possimus ad. Quaerat ipsum enim itaque adipisci ducimus at totam tenetur praesentium illo soluta earum deleniti vitae perspiciatis qui, sint libero esse. Quisquam tempora qui voluptate eveniet eligendi, molestias aperiam corporis laboriosam debitis minus veniam exercitationem soluta ducimus, quidem maxime dolores suscipit!
                    </p>
                </section>
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
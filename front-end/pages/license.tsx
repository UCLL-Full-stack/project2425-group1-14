import React from 'react';
import Header from '@components/Header'; // Import the Header component
import Footer from '@components/Footer'; // Import the Footer component

const License: React.FC = () => {
    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.content}>
                <section style={styles.blurb}>
                    <h1 style={styles.title}>License for Hannọ</h1>
                    <p style={styles.date}>Last updated: November 2024</p>
                </section>

                <section style={styles.section}>
                    <h2>MIT License</h2>
                    <br></br>
                    <p style={styles.sectionText}>
                        Copyright (c) 2024 Hannọ
                    </p>
                </section>
                

                <section style={styles.section}>
                    <p style={styles.sectionText}>
                        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    </p>
                    <br></br>
                    <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                    <br></br>
                    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
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

export default License;

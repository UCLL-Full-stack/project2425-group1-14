import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const AboutPage: React.FC = () => {
    return (
        <div className="container">
            <Header />

            <main>
                <section className="blurb">
                    <h1>About Us</h1>
                    <p className="date">Last updated: November 2024</p>
                </section>

                <section>
                    <h2>Who are we</h2>
                    <p>
                        Our team is made up of two students: Jack and Saperoi who are studying computer science at University. We are passionate about technology and its potential to create positive change in the world. We believe that technology can be a powerful tool for social good, and we are committed to using our skills to make a difference. We are excited to share our project with you, and we hope that it will inspire you to think about how technology can be used to create a better future for everyone.
                    </p>
                </section>

                <section>
                    <h2>Our story</h2>
                    <p>
                        Our story begins in the fall of 2024, when we were tasked with creating a project for our third semester.
                        We wanted to create something that would have a positive impact on society, and after much brainstorming,
                        we decided to create a voting software. We believe that voting is a fundamental right, and that everyone
                        should have the opportunity to participate in the democratic process. We hope that our software will make
                        voting more accessible to everyone, and that it will help to create a more inclusive and democratic society.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;

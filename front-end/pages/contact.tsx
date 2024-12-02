import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="container">
      <Header />

      <main>
        <section className="blurb">
          <h1>Contact Us</h1>
          <p className="date">Last updated: November 2024</p>
        </section>

        <section>
          <h2>Get in Touch</h2>
          <p>
            We would love to hear from you! Whether you have a question,
            feedback, or would like to collaborate with us, feel free to reach
            out via the contact details below.
          </p>

          <p>You can reach us via:</p>
          <br></br>

          <div className="contactCard">
            <div>
                <p>
                <strong>Saperoi</strong>
                </p>
                <ul>
                <li>
                    <strong>Github:</strong> saperoi
                </li>
                <li>
                    <strong>Email:</strong> sapero@icosahedr.online
                </li>
                </ul>
            </div>
            <div>
                <p>
                <strong>Jack van Hecke</strong>
                </p>
                <ul>
                <li>
                    <strong>Github:</strong> JackvanHecke
                </li>
                </ul>
            </div>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

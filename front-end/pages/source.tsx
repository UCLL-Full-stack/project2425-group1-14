import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Source: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <section className="blurb">
        <h1>Source for Hannọ</h1>
        <p className="date">Last updated: November 2024</p>
      </section>

      <section>
        <p>
          The source for Hannọ is available at{" "}
          <a href="https://github.com/UCLL-Full-stack/project2425-group1-14">
            https://github.com/UCLL-Full-stack/project2425-group1-14
          </a>
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Source;

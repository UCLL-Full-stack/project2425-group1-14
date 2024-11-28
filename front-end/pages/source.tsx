import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Source: React.FC = () => {
  return (
    <div style={styles.container}>
      <Header />
    <section style={styles.blurb}>
        <h1 style={styles.title}>Source for Hannọ</h1>
        <p style={styles.date}>Last updated: November 2024</p>
    </section>

      <section style={styles.section}>
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

const styles: Object & { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  blurb: {
    textAlign: "center"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "black",
    textTransform: 'uppercase',
  },
  date: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "black",
  },
  section: {
    marginBottom: "20px",
    color: "black",
  },
};

export default Source;

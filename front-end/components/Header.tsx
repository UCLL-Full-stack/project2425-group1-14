import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    if (savedName) {
      setLoggedInUser(String(savedName));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header1-container">
      <div className="header1-links-container">
        <Link href="/" className="header1-link">
          Home
        </Link>
        <Link href="/about" className="header1-link">
          About
        </Link>
        <Link href="/contact" className="header1-link">
          Contact
        </Link>
      </div>

      {loggedInUser && (
        <div className="header1-user-info-container">
          <span className="header1-logged-in-text">
            Logged in as {loggedInUser}
          </span>
        </div>
      )}

      <div className="header1-timer-container">
        <span className="header1-timer">{currentTime}</span>
      </div>
    </div>
  );
};

export default Header;

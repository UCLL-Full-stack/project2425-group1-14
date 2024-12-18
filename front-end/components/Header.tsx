import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const router = useRouter();

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

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("name");
    setLoggedInUser("");
    router.push("/");
  };

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
          <button className="header1-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <div className="header1-timer-container">
        <span className="header1-timer">{currentTime}</span>
      </div>
    </div>
  );
};

export default Header;

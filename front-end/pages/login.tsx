import { AuthenticationResponse, StatusMessage, User } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "@components/EmptyHeader";
import Footer from "@components/Footer";
import UserService from "service/UserService";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [showSignup, setShowSignup] = useState<boolean>(false); // Voor registratieformulier

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    region: "",
  });

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }

    try {
      const response = await UserService.loginUser({
        username: username,
        password: password,
      } as User);

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Failed to log in. Please check your username and password.");
        } else {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
      }

      const res: AuthenticationResponse = await response.json();
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);

      if (username === "testadmin") {
        router.push("/admin");
      } else if (username === "testvoter") {
        router.push("/voter");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.name === "TypeError") {
        setStatusMessages([
          {
            message: "NetworkError: Unable to reach the server.",
            type: "error",
          },
        ]);
      } else {
        setStatusMessages([{ message: error.message, type: "error" }]);
      }
    }
  };


  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Signup data:", signupData);
    setShowSignup(false);
  };

  return (
    <div className="login-page-container">
      <Header />
      <main className="login-main-container">
        <div className="login-card">
          {!showSignup ? (
            <>
              <h3 className="login-title decorated-title">Login</h3>
              {statusMessages.length > 0 && (
                <div className="login-status-container">
                  <ul className="login-status-list">
                    {statusMessages.map(({ message, type }, index) => (
                      <li
                        key={index}
                        className={classNames("login-status-item", {
                          "login-status-error": type === "error",
                          "login-status-success": type === "success",
                        })}
                      >
                        {message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="login-label decorated-label">
                  Username:
                </label>
                <div className="login-input-container">
                  <input
                    id="nameInput"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    className="login-input"
                  />
                  {usernameError && <p className="login-error">{usernameError}</p>}
                </div>

                <label htmlFor="passwordInput" className="login-label decorated-label">
                  Password:
                </label>
                <div className="login-input-container">
                  <input
                    id="passwordInput"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="login-input"
                  />
                  {passwordError && <p className="login-error">{passwordError}</p>}
                </div>

                <button className="login-button" type="submit">
                  Login
                </button>
              </form>
              <p className="signup-link" onClick={() => setShowSignup(true)}>
                Click here to sign up.
              </p>
            </>
          ) : (
            <>
              <h3 className="login-title decorated-title">Sign Up</h3>
              <form className="signup-form" onSubmit={handleSignup}>
                <label htmlFor="signupName" className="signup-label decorated-label">
                  Name:
                </label>
                <input
                  id="signupName"
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="signup-input"
                />


                <label htmlFor="signupEmail" className="signup-label decorated-label">
                  Email:
                </label>
                <input
                  id="signupEmail"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="signup-input"
                />

                <label htmlFor="signupPassword" className="signup-label decorated-label">
                  Password:
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="signup-input"
                />

                <label htmlFor="signupRegion" className="signup-label decorated-label">
                  Region:
                </label>
                <input
                  id="signupRegion"
                  type="text"
                  value={signupData.region}
                  onChange={(e) => setSignupData({ ...signupData, region: e.target.value })}
                  placeholder="Enter your region"
                  className="signup-input"
                />

                <button className="signup-button" type="submit">
                  Sign Up
                </button>
              </form>
              <p className="signup-link" onClick={() => setShowSignup(false)}>
                Already a member?
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLoginForm;

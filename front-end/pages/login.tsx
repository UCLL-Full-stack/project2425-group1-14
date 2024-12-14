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
          const errorResponse: Map<string, string> = await response.json();
          const errorMap: Map<string, string> = new Map(
            Object.entries(errorResponse)
          );

          const errorMessages: string[] = [];
          errorMap.forEach((message, type) => {
            errorMessages.push(`${type}: ${message}`);
          });

          throw new Error(errorMessages.join(", "));
        } else {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
      }

      const res: AuthenticationResponse = await response.json();
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      if (error.name === "TypeError") {
        setStatusMessages([
          {
            message: "NetworkError: Unable to reach the server.",
            type: "error",
          },
        ]);
      }
      setStatusMessages([{ message: error.message, type: "error" }]);
    }
  };

  return (
    <div className="login-page-container">
      <Header />
      <main className="login-main-container">
        <div className="login-card">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLoginForm;

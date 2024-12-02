import { StatusMessage } from "../types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/EmptyHeader";
import Footer from "../components/Footer";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;
        if (!name.trim()) {
            setNameError("Name is required");
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

        setStatusMessages([
            {
                message: "Login successful. Redirecting to homepage...",
                type: "success",
            },
        ]);

        sessionStorage.setItem("loggedInUser", name);

        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md p-8">
                    <h3 className="px-0 mb-4 text-center">Login</h3>
                    {statusMessages.length > 0 && (
                        <div className="row">
                            <ul className="list-none mb-3 mx-auto">
                                {statusMessages.map(({ message, type }, index) => (
                                    <li
                                        key={index}
                                        className={classNames({
                                            "text-red-800": type === "error",
                                            "text-green-800": type === "success",
                                        })}
                                    >
                                        {message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                            Username:
                        </label>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                id="nameInput"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter your username"
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {nameError && <p className="text-red-800">{nameError}</p>}
                        </div>

                        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                            Password:
                        </label>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                id="passwordInput"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {passwordError && <p className="text-red-800">{passwordError}</p>}
                        </div>

                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                            type="submit"
                        >
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

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LogoHeader from '../components/LogoHeader'; // Adjust the path as necessary

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('voter');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(`Logging in as ${role} with username: ${username}`);

        // Perform login logic here

        // Navigate to the index page after login
        router.push('/index');
    };

    return (
        <div style={loginStyles.container}>
            <div style={loginStyles.formContainer}>
                {/* <LogoHeader /> */}
                <h2 style={loginStyles.title}>Login</h2>
                <form onSubmit={handleLogin} style={loginStyles.form}>
                    <div style={loginStyles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            style={loginStyles.input}
                        />
                    </div>
                    <div style={loginStyles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={loginStyles.input}
                        />
                    </div>
                    <div style={loginStyles.formGroup}>
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={loginStyles.select}
                        >
                            <option value="voter">Voter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={loginStyles.loginButton}>Login</button>
                </form>
            </div>
        </div>
    );
};

const loginStyles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        animation: 'fadeIn 1s ease-in-out',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        animation: 'slideIn 0.5s ease-in-out',
    },
    title: {
        textAlign: 'center' as 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    select: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    loginButton: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Login;

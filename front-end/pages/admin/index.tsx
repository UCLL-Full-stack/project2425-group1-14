import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const [stats, setStats] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Voor specifieke foutmeldingen

    const links = [
        { label: 'Type', path: 'type', endpoint: '/types' },
        { label: 'Region', path: 'region', endpoint: '/regions' },
        { label: 'Party', path: 'party', endpoint: '/parties' },
        { label: 'Candidate', path: 'candidate', endpoint: '/candidates' },
        { label: 'User', path: 'user', endpoint: '/users' },
        { label: 'Ballot', path: 'ballot', endpoint: '/ballots' },
    ];

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Flexibele configuratie

    const fetchData = async (endpoint: string) => {
        setLoading(true);
        setStats(null);
        setError(null); // Reset eerdere fouten
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setStats(JSON.stringify(data, null, 2));
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to fetch data: ${error.message}`);
            } else {
                setError('Failed to fetch data: An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const navigateTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    return (
        <div className="admin-container">
            <nav className="admin-sidebar">
                {links.map((link) => (
                    <button
                        key={link.path}
                        className="admin-circleButton"
                        onClick={() => fetchData(link.endpoint)}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <div className="admin-content">
                <h1>Admin Panel</h1>
                <p>Select a category from the navigation to view statistics.</p>
                {loading && <p>Loading...</p>}
                {error && (
                    <p style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>
                        {error}
                    </p>
                )}
                {stats && (
                    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                        {stats}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;

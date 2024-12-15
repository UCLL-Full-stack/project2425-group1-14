import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // Assuming you have a Header component
import Footer from '../../components/Footer'; // Assuming you have a Footer component
import useSWR from 'swr';

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const [selectedLink, setSelectedLink] = useState<string>('types'); // Default to first endpoint
    const [error, setError] = useState<string | null>(null); // For specific error messages

    const links = [
        { label: 'Type', path: 'type', endpoint: 'types' },
        { label: 'Region', path: 'region', endpoint: 'regions' },
        { label: 'Party', path: 'party', endpoint: 'parties' },
        { label: 'Candidate', path: 'candidate', endpoint: 'candidates' },
        { label: 'User', path: 'user', endpoint: 'users' },
        { label: 'Ballot', path: 'ballot', endpoint: 'ballots' },
    ];

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Flexible configuration

    // Use SWR hook to fetch data from the selected API endpoint
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    // useSWR will now fetch based on the selectedLink endpoint
    const { data, error: swrError, isValidating } = useSWR(
        `${API_BASE_URL}${selectedLink}`, // Fetch data based on selected endpoint
        fetcher
    );

    // If there's a specific error in the SWR response, update state
    if (swrError) {
        setError(`Failed to fetch data: ${swrError.message}`);
    }

    const navigateTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    return (
        <div className="admin-container">
            <Header /> {/* Header stays at the top */}
            <div className="admin-main">
                <nav className="admin-sidebar">
                    {links.map((link) => (
                        <button
                            key={link.path}
                            className="admin-circleButton"
                            onClick={() => setSelectedLink(link.endpoint)} // Update selected endpoint
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
                <div className="admin-content">
                    <h1>Admin Panel</h1>
                    <p>Select a category from the navigation to view statistics.</p>
                    {isValidating && <p>Loading...</p>}
                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {data && (
                        <pre className="stats-output">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
            <Footer /> {/* Footer stays at the bottom */}
        </div>
    );
};

export default AdminPanel;

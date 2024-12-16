import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // Assuming you have a Header component
import Footer from '../../components/Footer'; // Assuming you have a Footer component
import useSWR from 'swr';
import { makeAGR, tablefy } from '@util';

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

    // Use SWR hook to fetch data from the selected API endpoint
    const getFetcher = async (endpoint: string) => await makeAGR(endpoint);

    // useSWR will now fetch based on the selectedLink endpoint
    const { data, error: swrError, isValidating } = useSWR(
        selectedLink, // Fetch data based on selected endpoint
        getFetcher
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
            <main className="admin-main">
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
                        <table dangerouslySetInnerHTML={{ __html: tablefy(data) }}></table>
                    )}
                </div>
            </main>
            <Footer /> {/* Footer stays at the bottom */}
        </div>
    );
};

export default AdminPanel;

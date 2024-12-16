import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useSWR from 'swr';
import { makeAGR, tablefy } from '@util';

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const [selectedLink, setSelectedLink] = useState<string>('types');
    const [error, setError] = useState<string | null>(null);

    const links = [
        { label: 'Type', path: 'type', endpoint: 'types' },
        { label: 'Region', path: 'region', endpoint: 'regions' },
        { label: 'Party', path: 'party', endpoint: 'parties' },
        { label: 'Candidate', path: 'candidate', endpoint: 'candidates' },
        { label: 'User', path: 'user', endpoint: 'users' },
        { label: 'Ballot', path: 'ballot', endpoint: 'ballots' },
    ];

    const getFetcher = async (endpoint: string) => await makeAGR(endpoint);

    const { data, error: swrError, isValidating } = useSWR(
        selectedLink,
        getFetcher
    );

    useEffect(() => {
        if (swrError) {
            setError(`Failed to fetch data: ${swrError.message}`);
        }
    }, [swrError]);


    const navigateTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    return (
        <div className="admin-container">
            <Header />
            <main className="admin-main">
                <nav className="admin-sidebar">
                    {links.map((link) => (
                        <button
                            key={link.path}
                            className="admin-circleButton"
                            onClick={() => setSelectedLink(link.endpoint)}
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
            <Footer />
        </div>
    );
};

export default AdminPanel;

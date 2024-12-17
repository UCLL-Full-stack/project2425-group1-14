import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/EmptyHeader';
import Footer from '../../components/Footer';
import useSWR from 'swr';
import { makeAGR, tablefy } from '@util';

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const [selectedLink, setSelectedLink] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const links = [
        { label: 'Type', path: 'type', endpoint: 'types' },
        { label: 'Region', path: 'region', endpoint: 'regions' },
        { label: 'Party', path: 'party', endpoint: 'parties' },
        { label: 'Candidate', path: 'candidate', endpoint: 'candidates' },
        { label: 'User', path: 'user', endpoint: 'users' },
        { label: 'Ballot', path: 'ballot', endpoint: 'ballots' },
    ];

    const getFetcher = async (endpoint: string) => {
        try {
            const data = await makeAGR(endpoint);
            return data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const { data, error: swrError, isValidating } = useSWR(selectedLink, getFetcher);

    useEffect(() => {
        if (swrError) {
            setError(`Failed to fetch data: ${swrError.message}`);
        }
    }, [swrError]);

    const navigateTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    const toggleRowSelection = (index: number) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(index)
                ? prevSelectedRows.filter((row) => row !== index)
                : [...prevSelectedRows, index]
        );
    };

    const deleteSelectedRows = () => {
        console.log("Deleting selected rows:", selectedRows);
        setSelectedRows([]);
    };

    const addNewRow = () => {
        console.log("Adding a new row...");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data ? data.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    ) : [];

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
                    {!selectedLink && <p>Select a category from the navigation to view statistics.</p>}
                    {isValidating && <p>Loading...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {selectedLink && data && (
                        <div>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                            </div>

                            <div className="selected-count">
                                {selectedRows.length > 0 && (
                                    <p>{selectedRows.length} row(s) selected</p>
                                )}
                            </div>

                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item: any, index: number) => (
                                            <tr
                                                key={item.id}
                                                onClick={() => toggleRowSelection(index)}
                                                className={selectedRows.includes(index) ? 'selected-row' : ''}
                                            >
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {selectedRows.length > 0 && (
                                <div className="action-buttons">
                                    <button className="action-btn delete" onClick={deleteSelectedRows}>Delete</button>
                                    <button className="action-btn edit" onClick={() => console.log('Edit', selectedRows)}>Edit</button>
                                </div>
                            )}

                            <button className="action-btn add" onClick={addNewRow}>Add a new item</button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPanel;

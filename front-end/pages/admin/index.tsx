import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/EmptyHeader';
import Footer from '../../components/Footer';
import useSWR from 'swr';
import { makeAGR } from '@util';

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const [selectedLink, setSelectedLink] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);
    const [newRowData, setNewRowData] = useState<any>({});
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [isEditingRow, setIsEditingRow] = useState<number | null>(null);

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

    const { data, error: swrError, isValidating, mutate } = useSWR(selectedLink, getFetcher);

    useEffect(() => {
        if (swrError) {
            setError(`Failed to fetch data: ${swrError.message}`);
        }
    }, [swrError]);

    useEffect(() => {
        setSelectedRows([]);
        setIsAddingRow(false);
    }, [selectedLink]);

    const toggleRowSelection = (index: number) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(index)
                ? prevSelectedRows.filter((row) => row !== index)
                : [...prevSelectedRows, index]
        );
    };

    const selectAllRows = () => {
        if (isAllSelected) {
            setSelectedRows([]);
        } else {
            if (data) {
                const allRowIndexes = data.map((_: any, index: number) => index);
                setSelectedRows(allRowIndexes);
            }
        }
        setIsAllSelected(!isAllSelected);
    };

    const deleteSelectedRows = async () => {
        try {
            await Promise.all(
                selectedRows.map(async (index) => {
                    const item = data[index];
                    await fetch(`/api/${selectedLink}/${item.id}`, {
                        method: 'DELETE',
                    });
                })
            );
            alert('Selected rows deleted.');
            mutate();
        } catch (error) {
            alert('Failed to delete rows. Please try again.');
        }
        setSelectedRows([]);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data
        ? data.filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toString().includes(searchTerm)
        )
        : [];

    const startEditing = (index: number) => {
        const item = data[index];
        setIsEditingRow(index);  // Mark the current row as being edited
        setNewRowData(item);     // Load the current row data into the form for editing
        setIsAddingRow(true);    // Switch to editing mode (similar to adding a new row)
    };

    const cancelEditing = () => {
        setIsEditingRow(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRowData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveEditedRow = async () => {
        if (isEditingRow === null) return;  // If no row is being edited, do nothing

        const item = data[isEditingRow];  // Get the item being edited
        const updatedData = { ...item, ...newRowData };  // Merge existing data with new data

        try {
            const response = await fetch(`/api/${selectedLink}/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const savedRow = await response.json();
                console.log('Updated row:', savedRow);
                cancelEditing();  // Cancel editing after saving
                mutate();          // Refresh the data after saving
            } else {
                alert('Failed to update the row.');
            }
        } catch (error) {
            alert('An error occurred while saving. Please try again.');
        }
    };


    const renderTable = () => {
        switch (selectedLink) {
            case 'ballots':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>System</th>
                                <th>Location</th>
                                <th>Actions</th>
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
                                    <td>{item.system}</td>
                                    <td>{item.location?.name}</td>
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'candidates':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Actions</th>
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
                                    <td>{item.location?.name}</td>
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'parties':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Abbreviation</th>
                                <th>Logo</th>
                                <th>Actions</th>
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
                                    <td>{item.abbr}</td>
                                    <td>
                                        <img src={item.logo} alt={item.name} width="50" />
                                    </td>
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'regions':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
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
                                    <td>{item.type?.name}</td>
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'types':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
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
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'users':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Actions</th>
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
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>{item.location?.name}</td>
                                    <td className="actions-column">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => startEditing(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
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
                    {!selectedLink && <p>Select a category from the navigation to view statistics.</p>}
                    {isValidating && <p>Loading...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {selectedLink && (
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
                                {renderTable()}
                            </div>

                            <div className="action-buttons">
                                {selectedRows.length > 0 && (
                                    <>
                                        <button className="action-btn delete" onClick={deleteSelectedRows}>
                                            Delete
                                        </button>
                                        <button
                                            className="action-btn select-all"
                                            onClick={selectAllRows}
                                        >
                                            {isAllSelected ? 'Deselect All' : 'Select All'}
                                        </button>
                                    </>
                                )}

                                {selectedRows.length === 0 && !isAddingRow && (
                                    <button
                                        className="action-btn add"
                                        onClick={() => {
                                            if (isEditingRow !== null) {
                                                setIsAddingRow(true);
                                            } else {
                                                setIsAddingRow(true);
                                            }
                                        }}
                                    >
                                        {isEditingRow !== null ? "Edit Item" : "Add a new item"}
                                    </button>

                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPanel;

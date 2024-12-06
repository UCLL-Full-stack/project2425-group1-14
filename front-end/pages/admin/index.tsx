import React from 'react';
import { useRouter } from 'next/router';


const AdminPanel: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(`/admin/${path}`);
    };

    const links = [
        { label: 'Type', path: 'type' },
        { label: 'Region', path: 'region' },
        { label: 'Party', path: 'party' },
        { label: 'Candidate', path: 'candidate' },
        { label: 'User', path: 'user' },
        { label: 'Ballot', path: 'ballot' },
    ];

    return (



        <div className="admin-container">

            <nav className="admin-sidebar">
                {links.map(link => (
                    <button
                        key={link.path}
                        className="admin-circleButton"
                        onClick={() => navigateTo(link.path)}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <div className="admin-content">
                <h1>Admin Panel</h1>
                <p>Select a category from the navigation to view statistics.</p>
            </div>
        </div>
    );
};

export default AdminPanel;

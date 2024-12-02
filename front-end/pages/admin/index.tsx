import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface VoterStats {
    totalVoters: number;
    totalVotes: number;
    totalCandidates: number;
}

const AdminPage: React.FC = () => {
    const [stats, setStats] = useState<VoterStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/admin/stats');
                setStats(response.data as VoterStats);
            } catch (err) {
                setError('Failed to fetch statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome, Admin</h1>
            <h2>Here are some statistics:</h2>
            {stats && (
                <div>
                    <table border={1} cellPadding={10}>
                        <thead>
                            <tr>
                                <th>Statistic</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Voters</td>
                                <td>{stats.totalVoters}</td>
                            </tr>
                            <tr>
                                <td>Total Votes</td>
                                <td>{stats.totalVotes}</td>
                            </tr>
                            <tr>
                                <td>Total Candidates</td>
                                <td>{stats.totalCandidates}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;

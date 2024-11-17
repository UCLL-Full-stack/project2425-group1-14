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
            <h1>Admin Dashboard</h1>
            {stats && (
                <div>
                    <p>Total Voters: {stats.totalVoters}</p>
                    <p>Total Votes: {stats.totalVotes}</p>
                    <p>Total Candidates: {stats.totalCandidates}</p>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
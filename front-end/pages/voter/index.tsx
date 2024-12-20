import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // Assuming you have a Header component
import Footer from '../../components/Footer'; // Assuming you have a Footer component
import useSWR from 'swr';
import { makeAGR } from '@util';
import { Ballot } from '@types';

const BallotSelect: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null); // For specific error messages

    // Use SWR hook to fetch data from the selected API endpoint
    const getFetcher = async (endpoint: string) => await makeAGR(endpoint);

    // useSWR will now fetch based on the selectedLink endpoint
    const { data, error: swrError, isValidating } = useSWR(
        "users/ballot", // Fetch data based on selected endpoint
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
        <div className="container">
            <Header />
            
            <main>
                <h1>Ongoing Elections</h1>
                {isValidating && <p>Loading...</p>}
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
                <ul>
                    {data && data.map((ballot: Ballot) => <li
                            id={`${ballot.id}`}
                            onClick={() => localStorage.setItem('ballot', `${ballot.id}`)}
                        ><a href={`/voter/vote`} style={{"color": "blue"}}>{ballot.name}</a></li>
                    )}
                </ul>

            </main>
            <Footer /> {/* Footer stays at the bottom */}
        </div>
    );
};

export default BallotSelect;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // Assuming you have a Header component
import Footer from '../../components/Footer'; // Assuming you have a Footer component
import useSWR from 'swr';
import { makeAGR } from '@util';
import { Ballot, Party } from '@types';

const Voting: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null); // For specific error messages
    const [ballotId, setBallotId] = useState<string>('');
    const [submitted, setSubmitted] = useState(false); // Of de stem is ingediend

    // Use SWR hook to fetch data from the selected API endpoint
    const getFetcher = async (endpoint: string) => await makeAGR(endpoint);

    useEffect(() => {
        const ballot = window.localStorage.getItem("ballot");
        if (ballot) {
            setBallotId(String(ballot));
        }
      }, []);
    
    // useSWR will now fetch based on the selectedLink endpoint
    const { data, error: swrError, isValidating } = useSWR(
        `ballots/parties/${ballotId}`, // Fetch data based on selected endpoint
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
        <div className="page-container">
            <Header />

            <div className="vote-container">
                <main className="vote-main">
                    <h1 className="vote-title">Vote for your region: </h1>
                    {!submitted ? (
                        <div className="vote-form">
                            {isValidating && <p>Loading...</p>}
                            {error && (
                                <p className="error-message">
                                    {error}
                                </p>
                            )}

                            <div className="vote-options">
                                {data && data.map((party: Party) => (
                                    <figure>
                                        <label>
                                            <img src={`${party.logo}`}></img>
                                        </label>
                                        <figcaption>
                                            <input
                                                type="checkbox"
                                                id={`${party.id}`}
                                                name={`${party.id}`}
                                                value={`${party.id}`}
                                            ></input>
                                            <label>
                                                <b>{party.candidate}</b>
                                            </label>
                                        </figcaption>
                                    </figure>
                                ))};
                            </div>
                        </div>)  : (
                        <p className="vote-thank-you">Thank you for voting!</p>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};
export default Voting;

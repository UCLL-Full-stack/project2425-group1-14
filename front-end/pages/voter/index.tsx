import React, { useState } from 'react';

const VoterPage: React.FC = () => {
    const [selectedCandidate, setSelectedCandidate] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3'];

    const handleVote = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedCandidate) {
            setSubmitted(true);
            // hiier moet onze backend gelinked zijn
            console.log(`Voted for: ${selectedCandidate}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Vote for Your Candidate</h1>
            {!submitted ? (
                <form onSubmit={handleVote}>
                    <div style={{ marginBottom: '20px' }}>
                        {candidates.map((candidate) => (
                            <div key={candidate}>
                                <input
                                    type="radio"
                                    id={candidate}
                                    name="candidate"
                                    value={candidate}
                                    onChange={(e) => setSelectedCandidate(e.target.value)}
                                />
                                <label htmlFor={candidate} style={{ marginLeft: '8px' }}>
                                    {candidate}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Submit Vote
                    </button>
                </form>
            ) : (
                <div>
                    <h2>Thank you for voting!</h2>
                    <p>You voted for: {selectedCandidate}</p>
                </div>
            )}
        </div>
    );
};

export default VoterPage;
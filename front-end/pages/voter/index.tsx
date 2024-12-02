import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VotePage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleVote = () => {
        if (selectedOption) {
            // Submit the vote (e.g., send to an API)
            console.log(`Voted for: ${selectedOption}`);
            setSubmitted(true);
        }
    };

    return (


        <div>
            <Header />
            <h1>Vote for your favorite option</h1>
            {!submitted ? (
                <div>
                    <div>
                        <input
                            type="radio"
                            id="option1"
                            name="vote"
                            value="Option 1"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <label htmlFor="option1">Option 1</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="option2"
                            name="vote"
                            value="Option 2"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <label htmlFor="option2">Option 2</label>
                    </div>
                    <button onClick={handleVote}>Submit Vote</button>
                </div>
            ) : (
                <p>Thank you for voting!</p>
            )}
            <Footer />
        </div>
    );
};

export default VotePage;

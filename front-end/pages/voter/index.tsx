import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VotePage: React.FC = () => {
    const [name, setName] = useState<string>(''); // Tracks user name
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Tracks selected party
    const [submitted, setSubmitted] = useState(false);

    const handleVote = () => {
        if (name && selectedOption) {
            console.log(`Voter Name: ${name}, Voted for: ${selectedOption}`);
            setSubmitted(true);
        } else {
            alert('Please enter your name and select an option.');
        }
    };

    return (
        <div className="page-container">

            <Header />


            <div className="vote-container">
                <main className="vote-main">
                    <h1 className="vote-title">Vote for your region: </h1>
                    {!submitted ? (
                        <div className="vote-form">

                            <div className="vote-input-group">
                                <p className="vote-name">{name}</p>
                            </div>



                            <div className="vote-options">
                                {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
                                    <div key={index} className="vote-option">
                                        <input
                                            type="radio"
                                            id={`option${index + 1}`}
                                            name="vote"
                                            value={option}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                        />
                                        <label htmlFor={`option${index + 1}`}>{option}</label>
                                    </div>
                                ))}
                            </div>


                            <div className="vote-button-container">
                                <button className="vote-submit-button" onClick={handleVote}>
                                    Submit Vote
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="vote-thank-you">Thank you for voting!</p>
                    )}
                </main>
            </div>




        </div>

    );
};

export default VotePage;

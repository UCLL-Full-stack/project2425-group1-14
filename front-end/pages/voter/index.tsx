import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VotePage: React.FC = () => {
    const [name, setName] = useState<string>(''); // Naam van de gebruiker
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Geselecteerde optie
    const [submitted, setSubmitted] = useState(false); // Of de stem is ingediend

    // Gebruik useEffect om opgeslagen waarden van localStorage op te halen
    useEffect(() => {
        const storedName = localStorage.getItem('voterName');
        const storedOption = localStorage.getItem('selectedOption');
        if (storedName) setName(storedName); // Naam ophalen uit localStorage
        if (storedOption) setSelectedOption(storedOption); // Geselecteerde optie ophalen uit localStorage
    }, []);

    const handleVote = () => {
        if (name && selectedOption) {
            console.log(`Voter Name: ${name}, Voted for: ${selectedOption}`);
            // Bewaar de gegevens in localStorage
            localStorage.setItem('voterName', name);
            localStorage.setItem('selectedOption', selectedOption);
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
                            {/* Toon de naam van de gebruiker */}
                            <div className="vote-input-group">
                                {name ? (
                                    <p className="vote-name">Hello, {name}!</p> // Naam weergeven
                                ) : (
                                    <p className="vote-name">Hello, Guest!</p> // Indien naam niet beschikbaar is
                                )}
                            </div>

                            <div className="vote-options">
                                {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
                                    <div key={index} className="vote-option">
                                        <input
                                            type="radio"
                                            id={`option${index + 1}`}
                                            name="vote"
                                            value={option}
                                            checked={selectedOption === option}
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

            <Footer />
        </div>
    );
};

export default VotePage;

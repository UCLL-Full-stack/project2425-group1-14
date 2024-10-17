import {Ballot} from "./ballot";
import {Voter} from "./voter";

export class VoterBallot {
    private ballot: Ballot;
    private voter: Voter;
    private votes: string[];

    constructor(voterBallot: {ballot: Ballot; voter: Voter; votes: string[]}) {
        this.ballot = voterBallot.ballot;
        this.voter = voterBallot.voter;
        this.votes = voterBallot.votes;
    }

    getBallot(): Ballot { return this.ballot; }
    getVoter(): Voter { return this.voter; }
    getVotes(): string[] { return this.votes; }

    changeVotes(votes: string[]): void {
        this.votes = votes;
    }

    equals(voterBallot: VoterBallot): boolean {
        return (
            this.ballot === voterBallot.getBallot() &&
            this.voter === voterBallot.getVoter() &&
            voterBallot.getVotes().every((vote) => {this.votes.includes(vote)})
        );
    }
}

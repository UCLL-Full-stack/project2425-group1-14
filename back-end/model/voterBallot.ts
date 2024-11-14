import {Ballot} from "./ballot";
import {Voter} from "./voter";

export class VoterBallot {
    readonly  ballot: Ballot;
    readonly  voter: Voter;
    readonly  votedFor: String;

    constructor(voterBallot: {ballot: Ballot; voter: Voter; votedFor: String}) {
        this.ballot = voterBallot.ballot;
        this.voter = voterBallot.voter;
        this.votedFor = voterBallot.votedFor;
    }

    getBallot(): Ballot { return this.ballot; }
    getVoter(): Voter { return this.voter; }
    getVotes(): String { return this.votedFor; }

    /*
    changeVotes(votedFor: String): void {
        this.votedFor = votedFor;
    }
    */

    equals(voterBallot: VoterBallot): boolean {
        return (
            this.ballot === voterBallot.getBallot() &&
            this.voter === voterBallot.getVoter() &&
            this.votedFor === voterBallot.getVotes()
        );
    }
}

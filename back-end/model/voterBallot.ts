import {Ballot} from "./ballot";
import {Voter} from "./voter";
import {PartyCandidate} from "./partyCandidate";

export class VoterBallot {
    readonly  ballot: Ballot;
    readonly  voter: Voter;
    readonly  votedFor: PartyCandidate[];

    constructor(voterBallot: {ballot: Ballot; voter: Voter; votedFor: PartyCandidate[]}) {
        this.ballot = voterBallot.ballot;
        this.voter = voterBallot.voter;
        this.votedFor = voterBallot.votedFor;
    }

    getBallot(): Ballot { return this.ballot; }
    getVoter(): Voter { return this.voter; }
    getVotes(): PartyCandidate[] { return this.votedFor; }

    /*
    changeVotes(votedFor: String): void {
        this.votedFor = votedFor;
    }
    */

    equals(voterBallot: VoterBallot): boolean {
        return (
            this.ballot === voterBallot.getBallot() &&
            this.voter === voterBallot.getVoter() &&
            voterBallot.getVotes().every((candidate) => {this.votedFor.includes(candidate)})
        );
    }
}

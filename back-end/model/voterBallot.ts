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

    equals(voterBallot: VoterBallot): boolean {
        return (
            this.ballot === voterBallot.ballot &&
            this.voter === voterBallot.voter &&
            voterBallot.votedFor.every((candidate) => {this.votedFor.includes(candidate)})
        );
    }
}

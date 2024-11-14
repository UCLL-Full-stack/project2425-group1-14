import {Ballot} from "./ballot";
import {Party} from "./party";

export class BallotParty {
    readonly  ballot: Ballot;
    readonly  party: Party;
    readonly  position: number;

    constructor(ballotParty: {ballot: Ballot; party: Party; position: number}) {
        this.ballot = ballotParty.ballot;
        this.party = ballotParty.party;
        this.position = ballotParty.position;
    }

    getBallot(): Ballot { return this.ballot; }
    getParty(): Party { return this.party; }
    getPosition(): number { return this.position; }

    equals(ballotParty: BallotParty): boolean {
        return (
            this.ballot === ballotParty.getBallot() &&
            this.party === ballotParty.getParty() &&
            this.position === ballotParty.getPosition()
        );
    }
}

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

    equals(ballotParty: BallotParty): boolean {
        return (
            this.ballot === ballotParty.ballot &&
            this.party === ballotParty.party &&
            this.position === ballotParty.position
        );
    }
}

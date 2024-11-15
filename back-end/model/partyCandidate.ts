import {Candidate} from "./candidate";
import {Party} from "./party";

export class PartyCandidate {
    readonly  candidate: Candidate;
    readonly  party: Party;
    readonly  position: number;

    constructor(partyCandidate: {candidate: Candidate; party: Party; position: number}) {
        this.candidate = partyCandidate.candidate;
        this.party = partyCandidate.party;
        this.position = partyCandidate.position;
    }

    equals(partyCandidate: PartyCandidate): boolean {
        return (
            this.candidate === partyCandidate.candidate &&
            this.party === partyCandidate.party &&
            this.position === partyCandidate.position
        );
    }
}

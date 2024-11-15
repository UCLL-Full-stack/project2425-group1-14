import { PartyCandidate } from "./partyCandidate";
import {Region} from "./region";

export class Candidate {
    readonly  id?: number;
    readonly  name: string;
    readonly  region: Region;

    constructor(candidate: { name: string; region: Region; parties: PartyCandidate[]; id?: number }) {
        this.id = candidate.id;
        this.name = candidate.name;
        this.region = candidate.region;
    }
    
    equals(candidate: Candidate): boolean {
        return (
            this.id === candidate.id &&
            this.name === candidate.name &&
            this.region === candidate.region
        );
    }
}

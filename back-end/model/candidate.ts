import { PartyCandidate } from "./partyCandidate";
import {Region} from "./region";
import { Type } from "./type";

export class Candidate {
    readonly  id?: number;
    readonly  name: string;
    readonly  region: Region;

    constructor(candidate: { name: string; region: Region; parties: PartyCandidate[]; id?: number }) {
        this.id = candidate.id;
        this.name = candidate.name;
        this.region = candidate.region;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getRegion(): Region { return this.region; }
    
    equals(candidate: Candidate): boolean {
        return (
            this.id === candidate.getId() &&
            this.name === candidate.getName() &&
            this.region === candidate.getRegion()
        );
    }
}

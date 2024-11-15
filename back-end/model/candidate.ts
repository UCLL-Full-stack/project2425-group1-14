import { PartyCandidate } from "./partyCandidate";
import {Region} from "./region";
import { Type } from "./type";

export class Candidate {
    readonly  id?: number;
    readonly  name: string;
    readonly  image: string;
    readonly  region: Region;

    constructor(candidate: { name: string; image: string; region: Region; parties: PartyCandidate[]; id?: number }) {
        this.id = candidate.id;
        this.name = candidate.name;
        this.image = candidate.image;
        this.region = candidate.region;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getImage(): string { return this.image; }
    getRegion(): Region { return this.region; }
    
    equals(candidate: Candidate): boolean {
        return (
            this.id === candidate.getId() &&
            this.name === candidate.getName() &&
            this.image === candidate.getImage() &&
            this.region === candidate.getRegion()
        );
    }
}

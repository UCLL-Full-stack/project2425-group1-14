import {Party} from "./party";
import {Region} from "./region";

export class Candidate {
    private id?: number;
    private name: string;
    private image: string;
    private region: Region;
    private parties: Party[];

    constructor(candidate: { name: string; image: string; region: Region; parties: Party[]; id?: number }) {
        this.id = candidate.id;
        this.name = candidate.name;
        this.image = candidate.image;
        this.region = candidate.region;
        this.parties = candidate.parties;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getImage(): string { return this.image; }
    getRegion(): Region { return this.region; }
    getParties(): Party[] { return this.parties; }

    addPartyToCandidate(party: Party): void {
        if (!this.parties.map(p => p.getType()).includes(party.getType())) {
            this.parties.push(party);
        }
    }
    removePartyFromCandidate(party: Party): void {
        if (this.parties.includes(party)) {
            const filtered = this.parties.filter((p) => p !== party);
            if ( filtered.length !== 0 ) {
                this.parties = filtered;
            }
        }
    }

    equals(candidate: Candidate): boolean {
        return (
            this.id === candidate.getId() &&
            this.name === candidate.getName() &&
            this.image === candidate.getImage() &&
            this.region === candidate.getRegion() &&
            candidate.getParties().every((party) => {this.parties.includes(party)})
        );
    }
}

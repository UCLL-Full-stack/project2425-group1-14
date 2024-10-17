import {Region} from "./region";

export class Ballot {
    private id?: number;
    private name: string;
    private system: string;
    private limit: number;
    private region: Region;

    constructor(ballot: { name: string; system: string; limit: number; region: Region; id?: number }) {
        this.id = ballot.id;
        this.name = ballot.name;
        this.system = ballot.system;
        this.limit = ballot.limit;
        this.region = ballot.region;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getSystem(): string { return this.system; }
    getLimit(): number { return this.limit; }
    getRegion(): Region { return this.region; }

    equals(ballot: Ballot): boolean {
        return (
            this.id === ballot.getId() &&
            this.name === ballot.getName() &&
            this.system === ballot.getSystem() &&
            this.limit === ballot.getLimit() &&
            this.region === ballot.getRegion()
        );
    }
}

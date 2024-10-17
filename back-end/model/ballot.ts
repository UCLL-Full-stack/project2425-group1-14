import {Region} from "./region";

export class Ballot {
    private id?: number;
    private name: string;
    private system: string;
    private minimum: number;
    private maximum: number;
    private region: Region;

    constructor(ballot: { name: string; system: string; minimum: number; maximum: number; region: Region; id?: number }) {
        this.id = ballot.id;
        this.name = ballot.name;
        this.system = ballot.system;
        this.minimum = ballot.minimum;
        this.maximum = ballot.maximum;
        this.region = ballot.region;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getSystem(): string { return this.system; }
    getMinimum(): number { return this.minimum; }
    getMaximum(): number { return this.maximum; }
    getRegion(): Region { return this.region; }

    equals(ballot: Ballot): boolean {
        return (
            this.id === ballot.getId() &&
            this.name === ballot.getName() &&
            this.system === ballot.getSystem() &&
            this.minimum === ballot.getMinimum() &&
            this.maximum === ballot.getMaximum() &&
            this.region === ballot.getRegion()
        );
    }
}

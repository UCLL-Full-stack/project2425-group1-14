import {Region} from "./region";

export class Ballot {
    readonly  id?: number;
    readonly  name: string;
    readonly  system: string;
    readonly  minimum: number;
    readonly  maximum: number;
    readonly  region: Region;

    constructor(ballot: { name: string; system: string; minimum: number; maximum: number; region: Region; id?: number }) {
        this.id = ballot.id;
        this.name = ballot.name;
        this.system = ballot.system;
        this.minimum = ballot.minimum;
        this.maximum = ballot.maximum;
        this.region = ballot.region;
    }

    equals(ballot: Ballot): boolean {
        return (
            this.id === ballot.id &&
            this.name === ballot.name &&
            this.system === ballot.system &&
            this.minimum === ballot.minimum &&
            this.maximum === ballot.maximum &&
            this.region === ballot.region
        );
    }
}

import {Type} from "./type";

export class Party {
    readonly  id?: number;
    readonly  name: string;
    readonly  abbr: string;
    readonly  image: string;
    readonly  type: Type[];

    constructor(party: { name: string; abbr: string; image: string; type: Type[]; id?: number }) {
        this.id = party.id;
        this.name = party.name;
        this.abbr = party.abbr;
        this.image = party.image;
        this.type = party.type;
    }

    equals(party: Party): boolean {
        return (
            this.id === party.id &&
            this.name === party.name &&
            this.abbr === party.abbr &&
            this.image === party.image &&
            this.type === party.type
        );
    }
}

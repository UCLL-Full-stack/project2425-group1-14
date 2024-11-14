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

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getAbbr(): string { return this.abbr; }
    getImage(): string { return this.image; }
    getType(): Type[] { return this.type; }

    /*
    addTypeToParty(type: Type): void {
        if (!this.type.includes(type)) {
            this.type.push(type);
        }
    }
    removeTypeFromParty(type: Type): void {
        if (this.type.includes(type)) {
            const filtered = this.type.filter((t) => t !== type);
            if ( filtered.length !== 0 ) {
                this.type = filtered;
            }
        }
    }
    */

    equals(party: Party): boolean {
        return (
            this.id === party.getId() &&
            this.name === party.getName() &&
            this.abbr === party.getAbbr() &&
            this.image === party.getImage() &&
            this.type === party.getType()
        );
    }
}

import {Type} from "./type";

export class Region {
    private id?: number;
    private name: string;
    private type: Type;
    private parent?: Region;

    constructor(region: { name: string; type: Type; parent: Region; id?: number }) {
        this.id = region.id;
        this.name = region.name;
        this.type = region.type;
        this.parent = region.parent;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getType(): Type { return this.type; }
    getParent(): Region | undefined { return this.parent; }

    equals(region: Region): boolean {
        return (
            this.id === region.getId() &&
            this.name === region.getName() &&
            this.type === region.getType() &&
            this.parent === region.getParent()
        );
    }
}

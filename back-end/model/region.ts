import {Type} from "./type";
import {Region as RegionPrisma, Type as TypePrisma, ChildRei } from '@prisma/client';

export class Region {
    readonly  id?: number;
    readonly  name: string;
    readonly  type: Type;
    readonly  parent?: Region;

    constructor(region: { name: string; type: Type; parent?: Region; id?: number }) {
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

    /*
    static from({ id, name, type, parent }: RegionPrisma & {type: TypePrisma; parent: RegionPrisma}) {
        var parentRec : RegionPrisma | undefined;
        if (parent === null) { parentRec = undefined } else { parentRec = Region.from(parentRec) }
        return new Region({name: name, type: Type.from(type), parent: parentRec, id: id});
    }
    */
    static from({ id, name, type, parent }: RegionPrisma & {type: TypePrisma; parent: RegionPrisma | null})   {
        return new Region({name: name, type: Type.from(type), parent: Region.from({id: }), id: id});
    }
}

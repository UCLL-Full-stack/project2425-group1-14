import { DomainError } from '../types/error';
import { Type } from './type';
import { Region as RegionPrisma, Type as TypePrisma } from '@prisma/client';

export class Region {
    readonly id?: number;
    readonly name: string;
    readonly type: Type;
    readonly parent?: Region;

    constructor(region: { name: string; type: Type; parent?: Region; id?: number }) {
        this.validate(region);
        this.id = region.id;
        this.name = region.name;
        this.type = region.type;
        this.parent = region.parent;
    }

    validate(region: { name: string }): void {
        if (region.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
    }

    equals(region: Region): boolean {
        return (
            this.id === region.id &&
            this.name === region.name &&
            this.type === region.type &&
            this.parent === region.parent
        );
    }

    static from(
        data: RegionPrisma & {
            type: TypePrisma;
            parent?: (RegionPrisma & { type: TypePrisma }) | null;
        }
    ): Region {
        return new Region({
            name: data.name,
            type: Type.from(data.type),
            parent: data.parent ? Region.from(data.parent) : undefined,
            id: data.id,
        });
    }
}

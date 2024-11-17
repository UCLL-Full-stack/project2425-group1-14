import { DomainError } from '../types/error';
import { Region } from './region';
import { Ballot as BallotPrisma, Region as RegionPrisma, Type as TypePrisma } from '@prisma/client';

export class Ballot {
    readonly id?: number;
    readonly name: string;
    readonly system: string;
    readonly minimum: number;
    readonly maximum: number;
    readonly location: Region;

    constructor(ballot: {
        name: string;
        system: string;
        minimum: number;
        maximum: number;
        location: Region;
        id?: number;
    }) {
        this.validate(ballot);
        this.id = ballot.id;
        this.name = ballot.name;
        this.system = ballot.system;
        this.minimum = ballot.minimum;
        this.maximum = ballot.maximum;
        this.location = ballot.location;
    }

    validate(ballot: { name: string; minimum: number; maximum: number }): void {
        if (ballot.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
        if (ballot.maximum > 0 && ballot.minimum > ballot.maximum) {
            throw new DomainError('Minimum cannot be more than maximum');
        }
    }

    equals(ballot: Ballot): boolean {
        return (
            this.id === ballot.id &&
            this.name === ballot.name &&
            this.system === ballot.system &&
            this.minimum === ballot.minimum &&
            this.maximum === ballot.maximum &&
            this.location === ballot.location
        );
    }

    static from(data: BallotPrisma & { location: RegionPrisma & { type: TypePrisma } }): Ballot {
        return new Ballot({
            id: data.id,
            name: data.name,
            system: data.system,
            minimum: data.minimum,
            maximum: data.maximum,
            location: Region.from(data.location),
        });
    }
}

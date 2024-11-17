import { Region } from './region';
import { Voter as VoterPrisma, Region as RegionPrisma, Type as TypePrisma } from '@prisma/client';

export class Voter {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly key: string;
    readonly location: Region;

    constructor(voter: {
        name: string;
        email: string;
        key: string;
        location: Region;
        id?: number;
    }) {
        this.id = voter.id;
        this.name = voter.name;
        this.email = voter.email;
        this.key = voter.key;
        this.location = voter.location;
    }

    equals(voter: Voter): boolean {
        return (
            this.id === voter.id &&
            this.name === voter.name &&
            this.email === voter.email &&
            this.key === voter.key &&
            this.location === voter.location
        );
    }

    static from(data: VoterPrisma & { location: RegionPrisma & { type: TypePrisma } }): Voter {
        return new Voter({
            id: data.id,
            name: data.name,
            email: data.email,
            key: data.key,
            location: Region.from(data.location),
        });
    }
}

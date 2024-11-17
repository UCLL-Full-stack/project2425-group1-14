import { DomainError } from '../types/error';
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
        this.validate(voter);
        this.id = voter.id;
        this.name = voter.name;
        this.email = voter.email;
        this.key = voter.key;
        this.location = voter.location;
    }

    validate(voter: { name: string, email: string }): void {
        if (voter.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
        if (voter.email.trim() == '') {
            throw new DomainError("Email cannot be empty")
        }
        // RFC 5322
        // Sourced from https://emailregex.com/
        const emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])");
        if (!emailRegex.test(voter.email)) {
            throw new DomainError("Email is of invalid format")
        }
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

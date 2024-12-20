import { DomainError } from '../types/error';
import { Type } from './type';
import { Party as PartyPrisma, Type as TypePrisma } from '@prisma/client';

export class Party {
    readonly id?: number;
    readonly name: string;
    readonly abbr: string;
    readonly logo: string;
    readonly type: Type;
    readonly candidate: string;

    constructor(party: { name: string; abbr: string; logo: string; type: Type; id?: number; candidate: string }) {
        this.validate(party);
        this.id = party.id;
        this.name = party.name;
        this.abbr = party.abbr;
        this.logo = party.logo;
        this.type = party.type;
        this.candidate = party.candidate;
    }

    validate(party: { name: string; abbr: string, candidate: string }) {
        if (party.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
        if (party.abbr.trim() == '') {
            throw new DomainError('Abbreviation cannot be empty');
        }
        if (party.candidate.trim() == '') {
            throw new DomainError('Candidate cannot be empty');
        }
    }

    equals(party: Party): boolean {
        return (
            this.id === party.id &&
            this.name === party.name &&
            this.abbr === party.abbr &&
            this.logo === party.logo &&
            this.type === party.type &&
            this.candidate === party.candidate
        );
    }

    static from(data: PartyPrisma & { type: TypePrisma }): Party {
        return new Party({
            id: data.id,
            name: data.name,
            abbr: data.abbr,
            logo: data.logo,
            type: Type.from(data.type),
            candidate: data.candidate,
        });
    }
}

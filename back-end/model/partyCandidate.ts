import { DomainError } from '../types/error';
import { Candidate } from './candidate';
import { Party } from './party';
import {
    PartyCandidate as PartyCandidatePrisma,
    Candidate as CandidatePrisma,
    Region as RegionPrisma,
    Party as PartyPrisma,
    Type as TypePrisma,
} from '@prisma/client';

export class PartyCandidate {
    readonly candidate: Candidate;
    readonly party: Party;
    readonly position: number;

    constructor(partyCandidate: { candidate: Candidate; party: Party; position: number }) {
        this.validate(partyCandidate);
        this.candidate = partyCandidate.candidate;
        this.party = partyCandidate.party;
        this.position = partyCandidate.position;
    }

    validate(partyCandidate: { position: number }) {
        if (partyCandidate.position < 1) {
            throw new DomainError('Position cannot be negative');
        }
    }

    equals(partyCandidate: PartyCandidate): boolean {
        return (
            this.candidate === partyCandidate.candidate &&
            this.party === partyCandidate.party &&
            this.position === partyCandidate.position
        );
    }

    static from(
        data: PartyCandidatePrisma & {
            candidate: CandidatePrisma & { location: RegionPrisma & { type: TypePrisma } };
            party: PartyPrisma & { type: TypePrisma };
        }
    ): PartyCandidate {
        return new PartyCandidate({
            candidate: Candidate.from(data.candidate),
            party: Party.from(data.party),
            position: data.position,
        });
    }
}

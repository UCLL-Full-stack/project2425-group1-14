import { Ballot } from './ballot';
import { Party } from './party';
import {
    BallotParty as BallotPartyPrisma,
    Ballot as BallotPrisma,
    Region as RegionPrisma,
    Party as PartyPrisma,
    Type as TypePrisma,
} from '@prisma/client';

export class BallotParty {
    readonly ballot: Ballot;
    readonly party: Party;

    constructor(ballotParty: { ballot: Ballot; party: Party }) {
        this.ballot = ballotParty.ballot;
        this.party = ballotParty.party;
    }

    equals(ballotParty: BallotParty): boolean {
        return this.ballot === ballotParty.ballot && this.party === ballotParty.party;
    }

    static from(
        data: BallotPartyPrisma & {
            ballot: BallotPrisma & { location: RegionPrisma & { type: TypePrisma } };
            party: PartyPrisma & { type: TypePrisma };
        }
    ): BallotParty {
        return new BallotParty({
            ballot: Ballot.from(data.ballot),
            party: Party.from(data.party),
        });
    }
}

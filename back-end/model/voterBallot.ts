import { Ballot } from './ballot';
import { User } from './user';
// import { PartyCandidate } from './partyCandidate';
import {
    VoterBallot as VoterBallotPrisma,
    User as UserPrisma,
    Ballot as BallotPrisma,
    Region as RegionPrisma,
    Type as TypePrisma,
} from '@prisma/client';
import { DomainError } from '../types/error';

export class VoterBallot {
    readonly ballot: Ballot;
    readonly voter: User;
    readonly votedFor: number[];

    constructor(voterBallot: { ballot: Ballot; voter: User; votedFor: number[] }) {
        this.validate(voterBallot)
        this.ballot = voterBallot.ballot;
        this.voter = voterBallot.voter;
        this.votedFor = voterBallot.votedFor;
    }

    validate(voterBallot: {voter: User}): void {
        if (voterBallot.voter.role != 'voter') {
            throw new DomainError("User is not of type 'voter'");
        }
    }

    equals(voterBallot: VoterBallot): boolean {
        return (
            this.ballot === voterBallot.ballot &&
            this.voter === voterBallot.voter &&
            voterBallot.votedFor.every((candidate) => {
                this.votedFor.includes(candidate);
            })
        );
    }

    static from(
        data: VoterBallotPrisma & {
            user: UserPrisma & { location: RegionPrisma & { type: TypePrisma } };
            ballot: BallotPrisma & { location: RegionPrisma & { type: TypePrisma } };
        }
    ): VoterBallot {
        return new VoterBallot({
            voter: User.from(data.user),
            ballot: Ballot.from(data.ballot),
            votedFor: JSON.parse(data.votedFor),
        });
    }
}

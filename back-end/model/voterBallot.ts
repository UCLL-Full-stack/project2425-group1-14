import { Ballot } from './ballot';
import { Voter } from './voter';
import { PartyCandidate } from './partyCandidate';
import {
    VoterBallot as VoterBallotPrisma,
    Voter as VoterPrisma,
    Ballot as BallotPrisma,
    Region as RegionPrisma,
    Type as TypePrisma,
} from '@prisma/client';

export class VoterBallot {
    readonly ballot: Ballot;
    readonly voter: Voter;
    readonly votedFor: PartyCandidate[];

    constructor(voterBallot: { ballot: Ballot; voter: Voter; votedFor: PartyCandidate[] }) {
        this.ballot = voterBallot.ballot;
        this.voter = voterBallot.voter;
        this.votedFor = voterBallot.votedFor;
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
            voter: VoterPrisma & { location: RegionPrisma & { type: TypePrisma } };
            ballot: BallotPrisma & { location: RegionPrisma & { type: TypePrisma } };
        }
    ): VoterBallot {
        return new VoterBallot({
            voter: Voter.from(data.voter),
            ballot: Ballot.from(data.ballot),
            votedFor: [],
        });
    }
}

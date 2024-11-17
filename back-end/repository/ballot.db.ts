import database from '../util/database';
import { RepositoryError } from '../types/error';
import { Ballot } from '../model/ballot';
import { BallotParty } from '../model/ballotParty';
import { Party } from '../model/party';

const getBallots = async (): Promise<Ballot[]> => {
    try {
        const ballotsPrisma = await database.ballot.findMany({
            include: { location: { include: { type: true } } },
        });
        return ballotsPrisma.map((ballotPrisma) => Ballot.from(ballotPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getBallotById = async ({ id }: { id: number }): Promise<Ballot | null> => {
    try {
        const ballotPrisma = await database.ballot.findUnique({
            where: { id: id },
            include: { location: { include: { type: true } } },
        });
        return ballotPrisma ? Ballot.from(ballotPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getBallotsByRegion = async ({ locationId }: { locationId: number }): Promise<Ballot[]> => {
    try {
        const ballotsPrisma = await database.ballot.findMany({
            where: { locationId: locationId },
            include: { location: { include: { type: true } } },
        });
        return ballotsPrisma.map((ballotPrisma) => Ballot.from(ballotPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartiesByBallot = async ({ id }: { id: number }): Promise<Party[]> => {
    try {
        const partyBallotsPrisma = await database.ballotParty.findMany({
            where: { ballotId: id },
            include: { party: { include: { type: true } } },
        });

        return partyBallotsPrisma.map((partyBallotPrisma) => Party.from(partyBallotPrisma.party));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getVotesByBallot = async ({ id }: { id: number }): Promise<Object[]> => {
    try {
        const voterBallotPrisma = await database.voterBallot.findMany({
            where: { ballotId: id },
        });
        return voterBallotPrisma.map((votedPrisma) => JSON.parse(votedPrisma.votedFor));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createBallot = async ({
    name,
    system,
    minimum,
    maximum,
    location,
}: Ballot): Promise<Ballot> => {
    try {
        const ballotPrisma = await database.ballot.create({
            data: {
                name: name,
                system: system,
                minimum: minimum,
                maximum: maximum,
                location: { connect: { id: location.id } },
            },
            include: { location: { include: { type: true } } },
        });
        return Ballot.from(ballotPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeBallotName = async ({ id, name }: { id: number; name: string }): Promise<Ballot> => {
    try {
        const ballotPrisma = await database.ballot.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { location: { include: { type: true } } },
        });
        return Ballot.from(ballotPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeBallotMinimum = async ({
    id,
    minimum,
}: {
    id: number;
    minimum: number;
}): Promise<Ballot> => {
    try {
        const ballotPrisma = await database.ballot.update({
            where: { id: id },
            data: {
                minimum: minimum,
            },
            include: { location: { include: { type: true } } },
        });
        return Ballot.from(ballotPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeBallotMaximum = async ({
    id,
    maximum,
}: {
    id: number;
    maximum: number;
}): Promise<Ballot> => {
    try {
        const ballotPrisma = await database.ballot.update({
            where: { id: id },
            data: {
                maximum: maximum,
            },
            include: { location: { include: { type: true } } },
        });
        return Ballot.from(ballotPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteBallotById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const voterBallotPrisma = await database.voterBallot.deleteMany({
            where: { ballotId: id },
        });
        const ballotPartyPrisma = await database.ballotParty.deleteMany({
            where: { ballotId: id },
        });
        const ballotPrisma = await database.ballot.deleteMany({
            where: { id: id },
        });
        return `Deleted ${voterBallotPrisma.count} VoterBallot, ${ballotPartyPrisma} BallotParties and ${ballotPrisma.count} Ballots`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getBallots,
    getBallotById,
    getBallotsByRegion,
    getPartiesByBallot,
    getVotesByBallot,
    createBallot,
    deleteBallotById,
    changeBallotName,
    changeBallotMinimum,
    changeBallotMaximum,
    /*
    addPartyToBallot,
    removePartyFromBallot,
    */
};

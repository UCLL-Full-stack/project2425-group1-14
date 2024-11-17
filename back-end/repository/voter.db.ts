import database from '../util/database';
import { RepositoryError } from '../types/error';
import { Voter } from '../model/voter';

const getVoters = async (): Promise<Voter[]> => {
    try {
        const votersPrisma = await database.voter.findMany({
            include: { location: { include: { type: true } } },
        });
        return votersPrisma.map((voterPrisma) => Voter.from(voterPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getVoterById = async ({ id }: { id: number }): Promise<Voter | null> => {
    try {
        const voterPrisma = await database.voter.findUnique({
            where: { id: id },
            include: { location: { include: { type: true } } },
        });
        return voterPrisma ? Voter.from(voterPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getVoterByEmail = async ({ email }: { email: string }): Promise<Voter | null> => {
    try {
        const voterPrisma = await database.voter.findUnique({
            where: { email: email },
            include: { location: { include: { type: true } } },
        });
        return voterPrisma ? Voter.from(voterPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getVotersByRegion = async ({ locationId }: { locationId: number }): Promise<Voter[]> => {
    try {
        const votersPrisma = await database.voter.findMany({
            where: { locationId: locationId },
            include: { location: { include: { type: true } } },
        });
        return votersPrisma.map((voterPrisma) => Voter.from(voterPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createVoter = async ({ name, email, key, location }: Voter): Promise<Voter> => {
    try {
        const voterPrisma = await database.voter.create({
            data: {
                name: name,
                email: email,
                key: key,
                location: { connect: { id: location.id } },
            },
            include: { location: { include: { type: true } } },
        });

        return Voter.from(voterPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteVoterById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const voterBallotPrisma = await database.voterBallot.deleteMany({
            where: { voterId: id },
        });
        const voterPrisma = await database.voter.deleteMany({
            where: { id: id },
        });
        return `Deleted ${voterBallotPrisma.count} VoterBallots and ${voterPrisma.count} Voters`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeVoterName = async ({ id, name }: { id: number; name: string }): Promise<Voter> => {
    try {
        const voterPrisma = await database.voter.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { location: { include: { type: true } } },
        });
        return Voter.from(voterPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};
const changeVoterEmail = async ({ id, email }: { id: number; email: string }): Promise<Voter> => {
    try {
        const voterPrisma = await database.voter.update({
            where: { id: id },
            data: {
                name: email,
            },
            include: { location: { include: { type: true } } },
        });
        return Voter.from(voterPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeVoterKey = async ({ id, key }: { id: number; key: string }): Promise<Voter> => {
    try {
        const voterPrisma = await database.voter.update({
            where: { id: id },
            data: {
                key: key,
            },
            include: { location: { include: { type: true } } },
        });
        return Voter.from(voterPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeVoterRegion = async ({
    id,
    locationId,
}: {
    id: number;
    locationId: number;
}): Promise<Voter> => {
    try {
        const voterPrisma = await database.voter.update({
            where: { id: id },
            data: {
                location: { connect: { id: locationId } },
            },
            include: { location: { include: { type: true } } },
        });
        return Voter.from(voterPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getVoters,
    getVoterById,
    getVoterByEmail,
    getVotersByRegion,
    createVoter,
    deleteVoterById,
    changeVoterName,
    changeVoterEmail,
    changeVoterKey,
    changeVoterRegion,
};

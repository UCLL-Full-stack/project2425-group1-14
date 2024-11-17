import database from '../util/database';
import { Party } from '../model/party';
import { RepositoryError } from '../types/error';
import { Candidate } from '../model/candidate';

const getParties = async (): Promise<Party[]> => {
    try {
        const partiesPrisma = await database.party.findMany({
            include: { type: true },
        });
        return partiesPrisma.map((partyPrisma) => Party.from(partyPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartyById = async ({ id }: { id: number }): Promise<Party | null> => {
    try {
        const partyPrisma = await database.party.findUnique({
            where: { id: id },
            include: { type: true },
        });
        return partyPrisma ? Party.from(partyPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartiesByName = async ({ name }: { name: string }): Promise<Party[]> => {
    try {
        const partiesPrisma = await database.party.findMany({
            where: { name: { contains: name } },
            include: { type: true },
        });
        return partiesPrisma.map((p) => Party.from(p));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartiesByType = async ({ typeId }: { typeId: number }): Promise<Party[]> => {
    try {
        const partiesPrisma = await database.party.findMany({
            where: { typeId: typeId },
            include: { type: true },
        });
        return partiesPrisma.map((p) => Party.from(p));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartiesByNameAndType = async ({
    name,
    typeId,
}: {
    name: string;
    typeId: number;
}): Promise<Party[]> => {
    try {
        const partiesPrisma = await database.party.findMany({
            where: { name: { contains: name }, typeId: typeId },
            include: { type: true },
        });
        return partiesPrisma.map((p) => Party.from(p));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createParty = async ({ name, abbr, logo, type }: Party): Promise<Party> => {
    try {
        const partyPrisma = await database.party.create({
            data: {
                name: name,
                abbr: abbr,
                logo: logo,
                type: { connect: { id: type.id } },
            },
            include: { type: true },
        });

        return Party.from(partyPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getCandidatesByParty = async ({ partyId }: { partyId: number }): Promise<Candidate[]> => {
    try {
        const partyCandidatesPrisma = await database.partyCandidate.findMany({
            where: {
                partyId: partyId,
            },
            include: {
                candidate: { include: { location: { include: { type: true } } } },
            },
        });
        return partyCandidatesPrisma.map((partyCandidatePrisma) =>
            Candidate.from(partyCandidatePrisma.candidate)
        );
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deletePartyById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const candidatesPartyPrisma = await database.partyCandidate.deleteMany({
            where: { partyId: id },
        });
        const ballotPartyPrisma = await database.ballotParty.deleteMany({
            where: { partyId: id },
        });
        const partiesPrisma = await database.party.deleteMany({
            where: { id: id },
        });
        return `Deleted ${candidatesPartyPrisma.count} PartyCandidates, ${ballotPartyPrisma} BallotParties and ${partiesPrisma.count} Parties.`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changePartyName = async ({ id, name }: { id: number; name: string }): Promise<Party> => {
    try {
        const partyPrisma = await database.party.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { type: true },
        });
        return Party.from(partyPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changePartyAbbr = async ({ id, abbr }: { id: number; abbr: string }): Promise<Party> => {
    try {
        const partyPrisma = await database.party.update({
            where: { id: id },
            data: {
                abbr: abbr,
            },
            include: { type: true },
        });
        return Party.from(partyPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changePartyLogo = async ({ id, logo }: { id: number; logo: string }): Promise<Party> => {
    try {
        const partyPrisma = await database.party.update({
            where: { id: id },
            data: {
                logo: logo,
            },
            include: { type: true },
        });
        return Party.from(partyPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changePartyType = async ({ id, typeId }: { id: number; typeId: number }): Promise<Party> => {
    try {
        const partyPrisma = await database.party.update({
            where: { id: id },
            data: {
                type: { connect: { id: typeId } },
            },
            include: { type: true },
        });
        return Party.from(partyPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getParties,
    getPartyById,
    getPartiesByName,
    getPartiesByType,
    getPartiesByNameAndType,
    getCandidatesByParty,
    createParty,
    deletePartyById,
    changePartyName,
    changePartyAbbr,
    changePartyLogo,
    changePartyType,
};

import database from '../util/database';
import { Party } from '../model/party';
import { RepositoryError } from '../types/error';
import { Type } from '../model/type';

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

export default {
    getParties,
    getPartyById,
    createParty,
    getPartiesByType,
};

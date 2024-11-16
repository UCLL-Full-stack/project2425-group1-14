import database from '../util/database';
import { Party } from '../model/party';
import { RepositoryError } from '../types/error';

const getParties = async (): Promise<Party[]> => {
    try {
        const partiesPrisma = await database.party.findMany();
        const parties = [];
        for (const pt of partiesPrisma) {
            const partyTypesPrisma = await database.partyType.findMany({
                where: { partyId: {equals: pt.id}},
                include: {type: true}
            });
            parties.push({ id: pt.id, name: pt.name, abbr: pt.abbr, logo: pt.logo, type: partyTypesPrisma.map(ptp => ptp.type)});
        }
        return parties.map((partyPrisma) => Party.from(partyPrisma));
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
        if (partyPrisma == null) { return null }
        const partyTypesPrisma = await database.partyType.findMany({
            where: { partyId: {equals: partyPrisma.id}},
            include: {type: true}
        });
        return Party.from({ id: partyPrisma.id, name: partyPrisma.name, abbr: partyPrisma.abbr, logo: partyPrisma.logo, type: partyTypesPrisma.map(ptp => ptp.type)})
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createParty = async ({ name, abbr, logo }: Party): Promise<Party> => {
    try {
        const partyPrisma = await database.party.create({
            data: {
                name: name,
                abbr: abbr,
                logo: logo
            }
        });

        return Party.from({ id: partyPrisma.id, name: partyPrisma.name, abbr: partyPrisma.abbr, logo: partyPrisma.logo, type: []});
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getParties,
    getPartyById,
    createParty
}
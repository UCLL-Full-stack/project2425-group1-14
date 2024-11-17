import { Party } from '../model/party';
import partyDB from '../repository/party.db';
import regionDb from '../repository/region.db';
import typeDB from '../repository/type.db';
import { PartyInput } from '../types';
import { ServiceError } from '../types/error';

const getParties = async (): Promise<Party[]> => {
    const parties = await partyDB.getParties();
    return parties;
};

const getPartyById = async (id: number): Promise<Party> => {
    const party = await partyDB.getPartyById({ id });
    if (!party) {
        throw new ServiceError(`Party with id ${id} does not exist.`);
    }
    return party;
};

const getPartiesByName = async (name: string): Promise<Party[]> => {
    const parties = await partyDB.getPartiesByName({ name });
    return parties;
};

const getPartiesByType = async (typeId: number): Promise<Party[]> => {
    const parties = await partyDB.getPartiesByType({ typeId });
    return parties;
};

const getPartiesByNameAndType = async (name: string, id: number): Promise<Party[]> => {
    const parties = await partyDB.getPartiesByNameAndType({ name, typeId: id });
    return parties;
};

const createParty = async ({ name, abbr, logo, typeId }: PartyInput): Promise<Party> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!abbr) {
        throw new ServiceError('Abbreviation was not provided');
    }
    if (!typeId) {
        throw new ServiceError('Type was not provided');
    }
    if (!logo) {
        // Transparent 1x1 pixel Base64
        logo =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';
    }

    const type = await typeDB.getTypeById({ id: typeId });
    if (!type) {
        throw new ServiceError(`Type with id ${typeId} does not exist.`);
    }

    const newParty = new Party({ name, abbr, logo, type });
    return await partyDB.createParty(newParty);
};

const deletePartyById = async (id: number): Promise<String> => {
    const party = await partyDB.deletePartyById({ id });
    return party;
};

const changePartyName = async (id: number, name: string): Promise<Party> => {
    var validationParty = await getPartyById(id);
    validationParty = new Party({ ...validationParty, name: name });

    const party = await partyDB.changePartyName({ id, name });
    return party;
};

const changePartyAbbr = async (id: number, abbr: string): Promise<Party> => {
    var validationParty = await getPartyById(id);
    validationParty = new Party({ ...validationParty, abbr: abbr });

    const party = await partyDB.changePartyAbbr({ id, abbr });
    return party;
};

const changePartyLogo = async (id: number, logo: string): Promise<Party> => {
    var validationParty = await getPartyById(id);
    validationParty = new Party({ ...validationParty, name: logo });

    const party = await partyDB.changePartyLogo({ id, logo });
    return party;
};

const changePartyType = async (id: number, typeId: number): Promise<Party> => {
    const type = await typeDB.getTypeById({ id: typeId });
    if (!type) {
        throw new ServiceError(`Type with id ${typeId} does not exist.`);
    }

    var validationParty = await getPartyById(id);
    validationParty = new Party({ ...validationParty, type: type });

    const party = await partyDB.changePartyType({ id, typeId });
    return party;
};

export default {
    getParties,
    getPartyById,
    getPartiesByName,
    getPartiesByType,
    getPartiesByNameAndType,
    createParty,
    deletePartyById,
    changePartyName,
    changePartyAbbr,
    changePartyLogo,
    changePartyType,
};

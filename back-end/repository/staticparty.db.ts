import { Party } from '../model/party';
import { Type } from '../model/type';

const parties: Party[] = [];

const getParties = (): Party[] => parties;

const getPartyById = (p: {id: number}): Party | undefined => {
    return parties.find((party: Party) => party.getId() === p.id);
};

const getPartiesByName = (p: {name: string}): Party[] => {
    return parties.filter((par: Party) => {par.getName().includes(p.name)});
};

const getPartiesByType = (p: {type: Type}): Party[] => {
    return parties.filter((par: Party) => {par.getType().includes(p.type)});
};

const createParty = (party: Party) => {
    parties.push(party);
    return parties.at(-1);
};

export default {
    getParties,
    getPartyById,
    getPartiesByName,
    getPartiesByType,
    createParty
};

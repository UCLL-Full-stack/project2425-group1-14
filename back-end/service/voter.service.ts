import { Voter } from '../model/voter';
import voterDB from '../repository/voter.db';
import regionDB from '../repository/region.db';
import { VoterInput } from '../types';
import { ServiceError } from '../types/error';

const getVoters = async (): Promise<Voter[]> => {
    const voters = await voterDB.getVoters();
    return voters;
};

const getVoterById = async (id: number): Promise<Voter> => {
    const voter = await voterDB.getVoterById({ id });
    if (!voter) {
        throw new ServiceError(`Voter with id ${id} does not exist.`);
    }
    return voter;
};

const getVoterByEmail = async (email: string): Promise<Voter> => {
    const voter = await voterDB.getVoterByEmail({ email });
    if (!voter) {
        throw new ServiceError(`Voter with email ${email} does not exist.`);
    }
    return voter;
};

const getVotersByRegion = async (locationId: number): Promise<Voter[]> => {
    const voters = await voterDB.getVotersByRegion({ locationId });
    return voters;
};

const createVoter = async ({ name, email, key, locationId }: VoterInput): Promise<Voter> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!email) {
        throw new ServiceError('Email was not provided');
    }
    if (!key) {
        throw new ServiceError('Key was not provided');
    }
    if (!locationId) {
        throw new ServiceError('Location was not provided');
    }

    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    const newVoter = new Voter({ name, email, key, location });
    return await voterDB.createVoter(newVoter);

}

const deleteVoterById = async (id: number): Promise<String> => {
    const voter = await voterDB.deleteVoterById({ id });
    return voter;
};

const changeVoterName = async (id: number, name: string): Promise<Voter> => {
    var validationVoter = await getVoterById(id);
    validationVoter = new Voter({ ...validationVoter, name: name });

    const voter = await voterDB.changeVoterName({ id, name });
    return voter;
};

const changeVoterEmail = async (id: number, email: string): Promise<Voter> => {
    var validationVoter = await getVoterById(id);
    validationVoter = new Voter({ ...validationVoter, email: email });

    const voter = await voterDB.changeVoterEmail({ id, email });
    return voter;
};

const changeVoterKey = async (id: number, key: string): Promise<Voter> => {
    var validationVoter = await getVoterById(id);
    validationVoter = new Voter({ ...validationVoter, key: key });

    const voter = await voterDB.changeVoterKey({ id, key });
    return voter;
};

const changeVoterRegion = async (id: number, locationId: number): Promise<Voter> => {
    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    var validationVoter = await getVoterById(id);
    validationVoter = new Voter({ ...validationVoter, location: location });

    const voter = await voterDB.changeVoterRegion({ id, locationId });
    return voter;
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

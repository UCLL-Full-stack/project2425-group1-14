import { PartyCandidate } from '../model/partyCandidate';
import { Candidate } from '../model/candidate';
import { Party } from '../model/party';
import candidateDB from '../repository/candidate.db';
import regionDB from '../repository/region.db';
import { CandidateInput } from '../types';
import { ServiceError } from '../types/error';

const getCandidates = async (): Promise<Candidate[]> => {
    const candidates = await candidateDB.getCandidates();
    return candidates;
};

const getCandidateById = async (id: number): Promise<Candidate> => {
    const candidate = await candidateDB.getCandidateById({ id });
    if (!candidate) {
        throw new ServiceError(`Candidate with id ${id} does not exist.`);
    }
    return candidate;
};

const getCandidatesByRegion = async (locationId: number): Promise<Candidate[]> => {
    const candidates = await candidateDB.getCandidatesByRegion({ locationId });
    return candidates;
};

const createCandidate = async ({ name, locationId }: CandidateInput): Promise<Candidate> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!locationId) {
        throw new ServiceError('Location was not provided');
    }

    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    const newCandidate = new Candidate({ name, location });
    return await candidateDB.createCandidate(newCandidate);
};

const deleteCandidateById = async (id: number): Promise<String> => {
    const candidate = await candidateDB.deleteCandidateById({ id });
    return candidate;
};

const changeCandidateName = async (id: number, name: string): Promise<Candidate> => {
    var validationCandidate = await getCandidateById(id);
    validationCandidate = new Candidate({ ...validationCandidate, name: name });

    const candidate = await candidateDB.changeCandidateName({ id, name });
    return candidate;
};

const changeCandidateRegion = async (id: number, locationId: number): Promise<Candidate> => {
    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    var validationCandidate = await getCandidateById(id);
    validationCandidate = new Candidate({ ...validationCandidate, location: location });

    const candidate = await candidateDB.changeCandidateRegion({ id, locationId });
    return candidate;
};

const getPartiesByCandidate = async (id: number): Promise<Party[]> => {
    const candidates = await candidateDB.getPartiesByCandidate({ candidateId: id });
    return candidates;
};

const addCandidateToParty = async (
    candidateId: number,
    partyId: number
): Promise<PartyCandidate> => {
    const partyCandidate = await candidateDB.addCandidateToParty({ candidateId, partyId });
    return partyCandidate;
};

const removeCandidateFromParty = async (candidateId: number, partyId: number): Promise<String> => {
    const partyCandidate = await candidateDB.removeCandidateFromParty({ candidateId, partyId });
    return partyCandidate;
};

const changePartyCandidatePosition = async (
    candidateId: number,
    partyId: number,
    position: number
): Promise<PartyCandidate> => {
    const partyCandidate = await candidateDB.changePartyCandidatePosition({
        candidateId,
        partyId,
        position,
    });
    return partyCandidate;
};

export default {
    getCandidates,
    getCandidateById,
    getCandidatesByRegion,
    createCandidate,
    deleteCandidateById,
    changeCandidateName,
    changeCandidateRegion,
    getPartiesByCandidate,
    addCandidateToParty,
    removeCandidateFromParty,
    changePartyCandidatePosition,
};

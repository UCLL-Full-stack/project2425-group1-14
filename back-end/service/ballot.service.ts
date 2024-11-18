import { Ballot } from '../model/ballot';
import { BallotParty } from '../model/ballotParty';
import { Party } from '../model/party';
import ballotDB from '../repository/ballot.db';
import regionDB from '../repository/region.db';
import { BallotInput } from '../types';
import { ServiceError } from '../types/error';

const getBallots = async (): Promise<Ballot[]> => {
    const ballots = await ballotDB.getBallots();
    return ballots;
};

const getBallotById = async (id: number): Promise<Ballot> => {
    const ballot = await ballotDB.getBallotById({ id });
    if (!ballot) {
        throw new ServiceError(`Ballot with id ${id} does not exist.`);
    }
    return ballot;
};

const getBallotsByRegion = async (locationId: number): Promise<Ballot[]> => {
    const ballots = await ballotDB.getBallotsByRegion({ locationId });
    return ballots;
};

const getPartiesByBallot = async (id: number): Promise<Party[]> => {
    const parties = await ballotDB.getPartiesByBallot({ id: id });
    return parties;
};

const getVotesByBallot = async (id: number): Promise<Object[]> => {
    const votes = await ballotDB.getVotesByBallot({ id: id });
    return votes;
};

const createBallot = async ({
    name,
    system,
    minimum,
    maximum,
    locationId,
}: BallotInput): Promise<Ballot> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!system) {
        throw new ServiceError('Voting system was not provided');
    }
    if (!minimum) {
        minimum = 0;
    }
    if (!maximum) {
        maximum = 1;
    }
    if (!locationId) {
        throw new ServiceError('Location was not provided');
    }

    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    const newBallot = new Ballot({ name, system, minimum, maximum, location });
    return await ballotDB.createBallot(newBallot);
};

const deleteBallotById = async (id: number): Promise<String> => {
    const ballot = await ballotDB.deleteBallotById({ id });
    return ballot;
};

const changeBallotName = async (id: number, name: string): Promise<Ballot> => {
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, name: name });

    const ballot = await ballotDB.changeBallotName({ id, name });
    return ballot;
};

const changeBallotMinimum = async (id: number, minimum: number): Promise<Ballot> => {
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, minimum: minimum });

    const ballot = await ballotDB.changeBallotMinimum({ id, minimum });
    return ballot;
};

const changeBallotMaximum = async (id: number, maximum: number): Promise<Ballot> => {
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, maximum: maximum });

    const ballot = await ballotDB.changeBallotMaximum({ id, maximum });
    return ballot;
};

const addPartyToBallot = async (ballotId: number, partyId: number): Promise<BallotParty> => {
    const ballotParty = ballotDB.addPartyToBallot({ ballotId, partyId });
    return ballotParty;
};

const removePartyFromBallot = async (ballotId: number, partyId: number): Promise<String> => {
    const ballotParty = ballotDB.removePartyFromBallot({ ballotId, partyId });
    return ballotParty;
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
    addPartyToBallot,
    removePartyFromBallot,
};

import { Ballot } from '../model/ballot';
import { BallotParty } from '../model/ballotParty';
import { Party } from '../model/party';
import ballotDB from '../repository/ballot.db';
import regionDB from '../repository/region.db';
import { BallotInput, BallotPartyInput } from '../types';
import { ServiceError } from '../types/error';
import regionService from './region.service';

const getBallots = async (): Promise<Ballot[]> => {
    const ballots = await ballotDB.getBallots();
    return ballots;
};

const countBallots = async (): Promise<Number> => {
    const ballots = await ballotDB.countBallots();
    return ballots;
};

const countBallotParties = async (): Promise<Number> => {
    const ballotParties = await ballotDB.countBallotParties();
    return ballotParties;
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

const changeBallotName = async ({ id, name }: BallotInput): Promise<Ballot> => {
    if (!id) {
        throw new ServiceError('Ballot was not provided');
    }
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, name: name });

    const ballot = await ballotDB.changeBallotName({ id, name });
    return ballot;
};

const changeBallotMinimum = async ({ id, minimum }: BallotInput): Promise<Ballot> => {
    if (!id) {
        throw new ServiceError('Ballot was not provided');
    }
    if (!minimum) {
        throw new ServiceError('Minimum was not provided');
    }
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, minimum: minimum });

    const ballot = await ballotDB.changeBallotMinimum({ id, minimum });
    return ballot;
};

const changeBallotMaximum = async ({ id, maximum }: BallotInput): Promise<Ballot> => {
    if (!id) {
        throw new ServiceError('Ballot was not provided');
    }
    if (!maximum) {
        throw new ServiceError('Maximum was not provided');
    }
    var validationBallot = await getBallotById(id);
    validationBallot = new Ballot({ ...validationBallot, maximum: maximum });

    const ballot = await ballotDB.changeBallotMaximum({ id, maximum });
    return ballot;
};

const addPartyToBallot = async ({ ballotId, partyId }: BallotPartyInput): Promise<BallotParty> => {
    if (!ballotId) {
        throw new ServiceError('Ballot was not provided');
    }
    if (!partyId) {
        throw new ServiceError('Party was not provided');
    }
    const ballotParty = ballotDB.addPartyToBallot({ ballotId, partyId });
    return ballotParty;
};

const removePartyFromBallot = async ({ ballotId, partyId }: BallotPartyInput): Promise<String> => {
    if (!ballotId) {
        throw new ServiceError('Ballot was not provided');
    }
    if (!partyId) {
        throw new ServiceError('Party was not provided');
    }
    const ballotParty = ballotDB.removePartyFromBallot({ ballotId, partyId });
    return ballotParty;
};

const getAllBallotsUpcursive = async (id: number): Promise<Ballot[]> => {
    const ballots = [];
    const regions = [await regionService.getRegionById(id), ...await regionService.getParents(id)];
    for (const r of regions) {
        ballots.push(...await ballotDB.getBallotsByRegion({locationId: r.id}));
    }
    return ballots;
}

export default {
    getBallots,
    countBallots,
    countBallotParties,
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
    getAllBallotsUpcursive
};

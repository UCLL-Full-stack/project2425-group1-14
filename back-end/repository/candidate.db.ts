import database from '../util/database';
import { RepositoryError } from '../types/error';
import { Candidate } from '../model/candidate';
import { PartyCandidate } from '../model/partyCandidate';
import { Party } from '../model/party';

const getCandidates = async (): Promise<Candidate[]> => {
    try {
        const candidatesPrisma = await database.candidate.findMany({
            include: { location: { include: { type: true } } },
        });
        return candidatesPrisma.map((candidatePrisma) => Candidate.from(candidatePrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getCandidateById = async ({ id }: { id: number }): Promise<Candidate | null> => {
    try {
        const candidatePrisma = await database.candidate.findUnique({
            where: { id: id },
            include: { location: { include: { type: true } } },
        });
        return candidatePrisma ? Candidate.from(candidatePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getCandidatesByRegion = async ({
    locationId,
}: {
    locationId: number;
}): Promise<Candidate[]> => {
    try {
        const candidatesPrisma = await database.candidate.findMany({
            where: { locationId: locationId },
            include: { location: { include: { type: true } } },
        });
        return candidatesPrisma.map((candidatePrisma) => Candidate.from(candidatePrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createCandidate = async ({ name, location }: Candidate): Promise<Candidate> => {
    try {
        const candidatePrisma = await database.candidate.create({
            data: {
                name: name,
                location: { connect: { id: location.id } },
            },
            include: { location: { include: { type: true } } },
        });

        return Candidate.from(candidatePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteCandidateById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const partyCandidatePrisma = await database.partyCandidate.deleteMany({
            where: { candidateId: id },
        });
        const candidatePrisma = await database.candidate.deleteMany({
            where: { id: id },
        });
        return `Deleted ${partyCandidatePrisma.count} PartyCandidates and ${candidatePrisma.count} Candidates`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeCandidateName = async ({
    id,
    name,
}: {
    id: number;
    name: string;
}): Promise<Candidate> => {
    try {
        const candidatePrisma = await database.candidate.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { location: { include: { type: true } } },
        });
        return Candidate.from(candidatePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeCandidateRegion = async ({
    id,
    locationId,
}: {
    id: number;
    locationId: number;
}): Promise<Candidate> => {
    try {
        const candidatePrisma = await database.candidate.update({
            where: { id: id },
            data: {
                location: { connect: { id: locationId } },
            },
            include: { location: { include: { type: true } } },
        });
        return Candidate.from(candidatePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getPartiesByCandidate = async ({
    candidateId
}: {
    candidateId: number
}): Promise<Party[]> => {
    try {
        const partyCandidatesPrisma = await database.partyCandidate.findMany({
            where: {
                candidateId: candidateId,
            },
            include: {
                party: { include: { type: true } },
            }
        });
        return partyCandidatesPrisma.map((partyCandidatePrisma) => Party.from(partyCandidatePrisma.party));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
}

const addCandidateToParty = async ({
    candidateId,
    partyId,
}: {
    candidateId: number;
    partyId: number;
}): Promise<PartyCandidate> => {
    try {
        const partyCandidatePrisma = await database.partyCandidate.create({
            data: {
                candidate: { connect: { id: candidateId } },
                party: { connect: { id: partyId } },
            },
            include: {
                party: { include: { type: true } },
                candidate: { include: { location: { include: { type: true } } } },
            },
        });
        return PartyCandidate.from(partyCandidatePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const removeCandidateFromParty = async ({
    candidateId,
    partyId,
}: {
    candidateId: number;
    partyId: number;
}): Promise<String> => {
    try {
        const partyCandidatePrisma = await database.partyCandidate.deleteMany({
            where: {
                candidateId: candidateId,
                partyId: partyId,
            }
        });
        return `Deleted ${partyCandidatePrisma.count} PartyCandidates`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changePartyCandidatePosition = async ({
    candidateId,
    partyId,
    position
}: {
    candidateId: number;
    partyId: number;
    position: number;
}): Promise<PartyCandidate> => {
    try {
        const partyCandidatePrisma = await database.partyCandidate.update({
            where: { partyCandidateId: {
                candidateId: candidateId,
                partyId: partyId,
            }},
            data: {
                position: position
            },
            include: {
                party: { include: { type: true } },
                candidate: { include: { location: { include: { type: true } } } },
            }
        });
        return PartyCandidate.from(partyCandidatePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
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

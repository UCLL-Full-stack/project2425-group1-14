import database from '../util/database';
import { RepositoryError } from '../types/error';
import { Candidate } from '../model/candidate';

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

const getCandidatesByRegion = async ({ locationId }: { locationId: number }): Promise<Candidate[]> => {
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

const changeCandidateName = async ({ id, name }: { id: number; name: string }): Promise<Candidate> => {
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

export default {
    getCandidates,
    getCandidateById,
    getCandidatesByRegion,
    createCandidate,
    deleteCandidateById,
    changeCandidateName,
    changeCandidateRegion,
    /*
    addCandidateToParty
    removeCandidateFromParty
    changePartyCandidatePosition
    */
};

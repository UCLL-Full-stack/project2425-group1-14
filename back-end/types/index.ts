type TypeInput = {
    id?: number;
    name?: string;
};

type RegionInput = {
    id?: number;
    name?: string;
    typeId?: number;
    parentId?: number | null;
};

type PartyInput = {
    id?: number;
    name?: string;
    abbr?: string;
    logo?: string;
    typeId?: number;
};

type CandidateInput = {
    id?: number;
    name?: string;
    locationId?: number;
};

type PartyCandidateInput = {
    candidateId?: number;
    partyId?: number;
    position?: number;
};

type VoterInput = {
    id?: number;
    name?: string;
    email?: string;
    key?: string;
    locationId?: number;
};

type BallotInput = {
    id?: number;
    name?: string;
    system?: string;
    minimum?: number;
    maximum?: number;
    locationId?: number;
};

type VoterBallotInput = {
    ballotId?: number;
    voterId?: number;
    votedFor?: Object;
};

type BallotPartyInput = {
    ballotId?: number;
    partyId?: number;
};

export {
    TypeInput,
    RegionInput,
    PartyInput,
    CandidateInput,
    PartyCandidateInput,
    VoterInput,
    BallotInput,
    VoterBallotInput,
    BallotPartyInput,
};

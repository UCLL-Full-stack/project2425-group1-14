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
    image?: string;
    typeIDs?: number[];
};

type CandidateInput = {
    id?: number;
    name?: string;
    image?: string;
    regionId?: number;
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
    phone?: string;
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
    votedFor?: number[];
};

type BallotPartyInput = {
    ballot?: number;
    party?: number;
    position?: number;
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
}
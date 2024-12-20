type Role = 'system' | 'admin' | 'manager' | 'voter';

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
    candidate?: string;
};

// type CandidateInput = {
//     id?: number;
//     name?: string;
//     locationId?: number;
// };

// type PartyCandidateInput = {
//     candidateId?: number;
//     partyId?: number;
//     position?: number;
// };

type UserInput = {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
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

type AuthenticationResponse = {
    token: string;
    username: string;
    name: string;
    role: Role;
};

export {
    Role,
    TypeInput,
    RegionInput,
    PartyInput,
    // CandidateInput,
    // PartyCandidateInput,
    UserInput,
    BallotInput,
    VoterBallotInput,
    BallotPartyInput,
    AuthenticationResponse,
};

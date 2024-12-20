type StatusMessage = {
    message: string;
    type: "error" | "success";
};

type Type = {
    id?: number;
    name?: string;
};

type Region = {
    id?: number;
    name?: string;
    typeId?: number;
    parentId?: number | null;
};

type Party = {
    id?: number;
    name?: string;
    abbr?: string;
    logo?: string;
    typeId?: number;
    candidate?: string;
};

// type Candidate = {
//     id?: number;
//     name?: string;
//     locationId?: number;
// };

// type PartyCandidate = {
//     candidateId?: number;
//     partyId?: number;
//     position?: number;
// };

type User = {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'manager' | 'voter';
    locationId?: number;
};

type Ballot = {
    id?: number;
    name?: string;
    system?: string;
    minimum?: number;
    maximum?: number;
    locationId?: number;
};

type VoterBallot = {
    ballotId?: number;
    voterId?: number;
    votedFor?: Object;
};

type BallotParty = {
    ballotId?: number;
    partyId?: number;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    name: string;
    role: 'admin' | 'manager' | 'voter';
};

export type {
    StatusMessage,
    Type,
    Region,
    Party,
    // Candidate,
    // PartyCandidate,
    User,
    Ballot,
    VoterBallot,
    BallotParty,
    AuthenticationResponse
};
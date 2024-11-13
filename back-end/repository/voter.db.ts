import { Region } from '../model/region';
import { Voter } from '../model/voter';

const voters: Voter[] = [];

const getVoters = (): Voter[] => voters;

const createVoter = (voter: Voter) => {
    voters.push(voter);
    return voters.at(-1);
};

export default {
    getVoters,
    createVoter
};

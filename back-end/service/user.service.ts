import { User } from '../model/user';
import userDB from '../repository/user.db';
import regionDB from '../repository/region.db';
import { Role, UserInput, AuthenticationResponse } from '../types';
import { ServiceError } from '../types/error';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const userRedactor = (user: User): User => {
    return new User({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        password: '[REDACTED]',
        role: user.role,
        location: user.location,
    });
};
const usersRedactor = (users: User[]): User[] => {
    return users.map((user) => userRedactor(user));
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!username) {
        throw new ServiceError('Username was not provided');
    }
    if (!password) {
        throw new ServiceError('Password was not provided');
    }
    const user = await getUserByUsername(username, {role: "system"});
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    
    return {
        token: generateJwtToken({ username, role: user.role }),
        username: username,
        name: user.name,
        role: user.role,
    };
};

const getUsers = async (auth?: { role: string }): Promise<User[]> => {
    const users = await userDB.getUsers();
    if (auth.role === 'manager') {
        return usersRedactor(users);
    }
    return users;
};

const countUsers = async (): Promise<Number> => {
    const users = await userDB.countUsers();
    return users;
};

const getUserById = async (id: number, auth?: { role: string }): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new ServiceError(`User with id ${id} does not exist.`);
    }
    if (auth.role === 'manager') {
        return userRedactor(user);
    }
    return user;
};

const getUserByEmail = async (email: string, auth?: { role: string }): Promise<User> => {
    const user = await userDB.getUserByEmail({ email });
    if (!user) {
        throw new ServiceError(`User with email ${email} does not exist.`);
    }
    if (auth.role === 'manager') {
        return userRedactor(user);
    }
    return user;
};

const getUserByUsername = async (username: string, auth?: { role: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new ServiceError(`User with username ${username} does not exist.`);
    }
    if (auth.role === 'manager') {
        return userRedactor(user);
    }
    return user;
};

const getUsersByRegion = async (locationId: number, auth?: { role: string }): Promise<User[]> => {
    const users = await userDB.getUsersByRegion({ locationId });
    if (auth.role === 'manager') {
        return usersRedactor(users);
    }
    return users;
};

const createVoter = async ({
    username,
    name,
    email,
    password,
    locationId,
}: UserInput): Promise<User> => {
    if (!username) {
        throw new ServiceError('Username was not provided');
    }
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!email) {
        throw new ServiceError('Email was not provided');
    }
    if (!password) {
        throw new ServiceError('Password was not provided');
    }
    if (!locationId) {
        throw new ServiceError('Location was not provided');
    }

    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    password = await bcrypt.hash(password, 12);
    const newUser = new User({ username, name, email, password, role: 'voter', location });
    return await userDB.createUser(newUser);
};

const deleteUserById = async (id: number): Promise<String> => {
    const user = await userDB.deleteUserById({ id });
    return user;
};

const changeUserName = async ({ id, name }: UserInput): Promise<User> => {
    if (!id) {
        throw new ServiceError('User was not provided');
    }
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    var validationUser = await getUserById(id);
    validationUser = new User({ ...validationUser, name: name });

    const user = await userDB.changeUserName({ id, name });
    return user;
};

const changeUserEmail = async ({ id, email }: UserInput): Promise<User> => {
    if (!id) {
        throw new ServiceError('User was not provided');
    }
    if (!email) {
        throw new ServiceError('Email was not provided');
    }
    const existUser = await userDB.getUserByEmail({ email });
    if (existUser) {
        throw new ServiceError(`User with email ${email} already exists.`);
    }

    var validationUser = await getUserById(id);
    validationUser = new User({ ...validationUser, email: email });

    const user = await userDB.changeUserEmail({ id, email });
    return user;
};

const changeUserPassword = async ({ id, password }: UserInput): Promise<User> => {
    if (!id) {
        throw new ServiceError('User was not provided');
    }
    if (!password) {
        throw new ServiceError('Password was not provided');
    }
    password = await bcrypt.hash(password, 12);
    var validationUser = await getUserById(id);
    validationUser = new User({ ...validationUser, password: password });

    const user = await userDB.changeUserPassword({ id, password });
    return user;
};

const changeUserRegion = async ({ id, locationId }: UserInput): Promise<User> => {
    if (!id) {
        throw new ServiceError('User was not provided');
    }
    if (!locationId) {
        throw new ServiceError('Location was not provided');
    }
    const location = await regionDB.getRegionById({ id: locationId });
    if (!location) {
        throw new ServiceError(`Location with id ${locationId} does not exist.`);
    }

    var validationUser = await getUserById(id);
    validationUser = new User({ ...validationUser, location: location });

    const user = await userDB.changeUserRegion({ id, locationId });
    return user;
};

export default {
    authenticate,
    getUsers,
    countUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getUsersByRegion,
    createVoter,
    deleteUserById,
    changeUserName,
    changeUserEmail,
    changeUserPassword,
    changeUserRegion,
    /*
    submitVote,
    deleteVote,
    updateVote,
    */
};

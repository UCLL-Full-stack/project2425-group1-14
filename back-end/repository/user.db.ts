import database from '../util/database';
import { RepositoryError } from '../types/error';
import { User } from '../model/user';

const getUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { location: { include: { type: true } } },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const countUsers = async (): Promise<Number> => {
    try {
        const countPrisma = await database.user.count();
        return countPrisma;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id: id },
            include: { location: { include: { type: true } } },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email: email },
            include: { location: { include: { type: true } } },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getUsersByRegion = async ({ locationId }: { locationId: number }): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: { locationId: locationId },
            include: { location: { include: { type: true } } },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username: username },
            include: { location: { include: { type: true } } },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createUser = async ({
    username,
    name,
    email,
    password,
    role,
    location,
}: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: username,
                name: name,
                email: email,
                password: password,
                role: role,
                location: { connect: { id: location.id } },
            },
            include: { location: { include: { type: true } } },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteUserById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const voterBallotPrisma = await database.voterBallot.deleteMany({
            where: { userId: id },
        });
        const userPrisma = await database.user.deleteMany({
            where: { id: id },
        });
        return `Deleted ${voterBallotPrisma.count} VoterBallots and ${userPrisma.count} Users`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeUserName = async ({ id, name }: { id: number; name: string }): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { location: { include: { type: true } } },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeUserEmail = async ({ id, email }: { id: number; email: string }): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: id },
            data: {
                email: email,
            },
            include: { location: { include: { type: true } } },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeUserPassword = async ({
    id,
    password,
}: {
    id: number;
    password: string;
}): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: id },
            data: {
                password: password,
            },
            include: { location: { include: { type: true } } },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeUserRegion = async ({
    id,
    locationId,
}: {
    id: number;
    locationId: number;
}): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: id },
            data: {
                location: { connect: { id: locationId } },
            },
            include: { location: { include: { type: true } } },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getUsers,
    countUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getUsersByRegion,
    createUser,
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

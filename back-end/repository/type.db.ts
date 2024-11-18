import database from '../util/database';
import { Type } from '../model/type';
import { RepositoryError } from '../types/error';

const getTypes = async (): Promise<Type[]> => {
    try {
        const typesPrisma = await database.type.findMany();
        return typesPrisma.map((typePrisma) => Type.from(typePrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getTypeById = async ({ id }: { id: number }): Promise<Type | null> => {
    try {
        const typePrisma = await database.type.findUnique({
            where: { id },
        });

        return typePrisma ? Type.from(typePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getTypeByName = async ({ name }: { name: string }): Promise<Type[]> => {
    try {
        const typesPrisma = await database.type.findMany({
            where: { name: { equals: name } },
        });

        return typesPrisma.map((typePrisma) => Type.from(typePrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createType = async ({ name }: Type): Promise<Type> => {
    try {
        const coursePrisma = await database.type.create({
            data: {
                name,
            },
        });

        return Type.from(coursePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteTypeById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const partyPrisma = await database.party.deleteMany({
            where: { typeId: id },
        });
        const regionPrisma = await database.region.deleteMany({
            where: { typeId: id },
        });
        const typePrisma = await database.type.deleteMany({
            where: { id: id },
        });
        return `Deleted ${partyPrisma.count} Parties, ${regionPrisma.count} Regions and ${typePrisma.count} Types.`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError(
            'Database error. See server log for details.\nIf you are not a server admin, please check that any parties or regions with this type are deleted first.'
        );
    }
};

const changeTypeName = async ({ id, name }: { id: number; name: string }): Promise<Type> => {
    try {
        const typePrisma = await database.type.update({
            where: { id: id },
            data: {
                name: name,
            },
        });
        return Type.from(typePrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

export default {
    getTypes,
    getTypeById,
    getTypeByName,
    createType,
    deleteTypeById,
    changeTypeName,
};

import { Type } from '../model/type';
import typeDB from '../repository/type.db';
import { TypeInput } from '../types';
import { ServiceError } from '../types/error';

const getTypes = async (): Promise<Type[]> => {
    const types = await typeDB.getTypes();
    return types;
};

const getTypeById = async (id: number): Promise<Type> => {
    const type = await typeDB.getTypeById({ id });
    if (!type) throw new ServiceError(`Type with id ${id} does not exist.`);
    return type;
};

const createType = async ({ name }: TypeInput): Promise<Type> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }

    const existingType = await typeDB.getTypeByName({ name: name });
    if (existingType.length > 0) throw new ServiceError('Type with this name already exists.');

    const newType = new Type({ name });
    return await typeDB.createType(newType);
};

export default { getTypes, getTypeById, createType };

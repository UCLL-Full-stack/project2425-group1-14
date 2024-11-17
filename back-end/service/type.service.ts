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
    if (!type) {
        throw new ServiceError(`Type with id ${id} does not exist.`);
    }
    return type;
};

const getTypeByName = async (name: string): Promise<Type[]> => {
    const types = await typeDB.getTypeByName({ name });
    return types;
};

const createType = async ({ name }: TypeInput): Promise<Type> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }

    const newType = new Type({ name });
    return await typeDB.createType(newType);
};

const deleteTypeById = async (id: number): Promise<String> => {
    const type = await typeDB.deleteTypeById({ id });
    return type;
};

const changeTypeName = async (id: number, name: string): Promise<Type> => {
    var validationType = await getTypeById(id);
    validationType = new Type({ ...validationType, name: name });

    const type = await typeDB.changeTypeName({ id, name });
    return type;
};

export default { getTypes, getTypeById, getTypeByName, createType, deleteTypeById, changeTypeName };

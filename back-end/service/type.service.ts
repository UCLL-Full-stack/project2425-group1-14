import { Type } from '../model/type';
import typeDB from '../repository/type.db';

const getTypes = async () : Promise<Type[]> => {
    const types = await typeDB.getTypes();
    return types;
}

const getTypeById = async (id: number): Promise<Type> => {
    const type = await typeDB.getTypeById({ id });
    if (!type) throw new Error(`Type with id ${id} does not exist.`);
    return type;
};

export default { getTypes, getTypeById };
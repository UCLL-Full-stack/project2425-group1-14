import { Type } from '../model/type';

const types: Type[] = [];

const getTypes = (): Type[] => types;

const getTypeById = (t: {id: number}): Type | undefined => {
    return types.find((type: Type) => type.getId() === t.id);
};

const getTypeByName = (t: {name: string}): Type | undefined => {
    return types.find((type: Type) => type.getName() === t.name);
};

const createType = (type: Type) => {
    types.push(type);
    return types.at(-1);
};

export default {
    getTypes,
    getTypeById,
    getTypeByName,
    createType
};
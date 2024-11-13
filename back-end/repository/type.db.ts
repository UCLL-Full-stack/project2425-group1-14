import { Type } from '../model/type';

const types: Type[] = [
    new Type({name: "european"}),
    new Type({name: "federal"}),
    new Type({name: "regional"}),
    new Type({name: "provincial"}),
    new Type({name: "municipal"})
];

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
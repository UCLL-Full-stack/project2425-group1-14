import { Region } from '../model/region';
import regionDB from '../repository/region.db';
import typeDB from '../repository/type.db';
import { RegionInput } from '../types';
import { ServiceError } from '../types/error';

const getRegions = async (): Promise<Region[]> => {
    const regions = await regionDB.getRegions();
    return regions;
};

const getRegionById = async (id: number): Promise<Region> => {
    const region = await regionDB.getRegionById({ id });
    if (!region) {
        throw new ServiceError(`Region with id ${id} does not exist.`);
    }
    return region;
};

const getRegionsByName = async (name: string): Promise<Region[]> => {
    const regions = await regionDB.getRegionsByName({ name });
    return regions;
};

const getRegionsByType = async (typeId: number): Promise<Region[]> => {
    const regions = await regionDB.getRegionsByType({ typeId });
    return regions;
};

const getRegionsByNameAndType = async (name: string, id: number): Promise<Region[]> => {
    const regions = await regionDB.getRegionsByNameAndType({ name, typeId: id });
    return regions;
};

const createRegion = async ({ name, typeId, parentId }: RegionInput): Promise<Region> => {
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    if (!typeId) {
        throw new ServiceError('Type was not provided');
    }
    if (!parentId) {
        parentId = null;
    }

    const type = await typeDB.getTypeById({ id: typeId });
    if (!type) {
        throw new ServiceError(`Type with id ${typeId} does not exist.`);
    }

    var parent = undefined;
    if (parentId != null) {
        parent = await regionDB.getRegionById({ id: parentId });
        if (!parent) {
            throw new ServiceError(`Region with id ${parentId} does not exist.`);
        }
    }

    const existingRegion = await regionDB.getRegionByNameAndType({ name: name, typeId: typeId });
    if (existingRegion.length > 0) {
        throw new ServiceError('Region with this name and type already exists.');
    }

    const newRegion = new Region({ name, type, parent });
    return await regionDB.createRegion(newRegion);
};

const getChildren = async (parentId: number): Promise<Region[]> => {
    const regions = await regionDB.getChildren({ parentId });
    return regions;
};

const getChildrenRecursive = async (parentId: number): Promise<Region[]> => {
    const regions = await regionDB.getChildrenRecursive({ parentId });
    return regions;
};

const getParents = async (childId: number): Promise<Region[]> => {
    const regions = await regionDB.getParents({ childId });
    return regions;
};

export default {
    getRegions,
    getRegionById,
    getRegionsByName,
    getRegionsByType,
    getRegionsByNameAndType,
    createRegion,
    getChildren,
    getChildrenRecursive,
    getParents,
};

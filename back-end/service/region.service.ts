import { Region } from '../model/region';
import regionDB from '../repository/region.db';
import typeDB from '../repository/type.db';
import { RegionInput } from '../types';
import { ServiceError } from '../types/error';

const getRegions = async (): Promise<Region[]> => {
    const regions = await regionDB.getRegions();
    return regions;
};

const countRegions = async (): Promise<Number> => {
    const regions = await regionDB.countRegions();
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
    
    var parent: Region | null | undefined = undefined;
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

const getDescendants = async (parentId: number): Promise<Region[]> => {
    const regions = await regionDB.getDescendants({ parentId });
    return regions;
};

const getParents = async (childId: number): Promise<Region[]> => {
    const regions = await regionDB.getParents({ childId });
    return regions;
};

const deleteRegionById = async (id: number): Promise<String> => {
    const region = await regionDB.deleteRegionById({ id });
    return region;
};

const changeRegionName = async ({ id, name }: RegionInput): Promise<Region> => {
    if (!id) {
        throw new ServiceError('Region was not provided');
    }
    if (!name) {
        throw new ServiceError('Name was not provided');
    }
    var validationRegion = await getRegionById(id);
    validationRegion = new Region({ ...validationRegion, name: name });

    const region = await regionDB.changeRegionName({ id, name });
    return region;
};

const changeRegionParent = async ({ id, parentId }: RegionInput): Promise<Region> => {
    if (!id) {
        throw new ServiceError('Region was not provided');
    }
    if (!parentId) {
        throw new ServiceError('Parent was not provided');
    }
    const region = await regionDB.changeRegionParent({ id, parentId });
    return region;
};

export default {
    getRegions,
    countRegions,
    getRegionById,
    getRegionsByName,
    getRegionsByType,
    getRegionsByNameAndType,
    createRegion,
    getChildren,
    getDescendants,
    getParents,
    deleteRegionById,
    changeRegionName,
    changeRegionParent,
};

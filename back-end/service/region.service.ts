import { Region } from '../model/region';
import regionDB from '../repository/region.db';
import typeDB from '../repository/type.db';
import { RegionInput } from '../types';

const getRegions = async () : Promise<Region[]> => {
    const regions = await regionDB.getRegions();
    return regions;
}

const getRegionById = async (id: number): Promise<Region> => {
    const region = await regionDB.getRegionById({ id });
    if (!region) throw new Error(`Region with id ${id} does not exist.`);
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

const createRegion = async({name, typeId, parentId}: RegionInput): Promise<Region> => {
    if (!name) { throw new Error('Name was not provided')}
    if (!typeId) { throw new Error('Type was not provided')}
    if (!parentId) { parentId = null}
    
    const type = await typeDB.getTypeById({ id: typeId });
    if (!type) throw new Error(`Type with id ${typeId} does not exist.`);

    var parent = undefined;
    if (parentId != null) {
        parent = await regionDB.getRegionById({ id: parentId });
        if (!parent) throw new Error(`Region with id ${parentId} does not exist.`);
    }

    const existingRegion = await regionDB.getRegionByNameAndType({name: name, typeId: typeId});
    if (existingRegion.length > 0) throw new Error('Region with this name and typealready exists.');

    const newRegion = new Region({name, type, parent});
    return await regionDB.createRegion(newRegion);
};

const getChildren = async (parentId: number): Promise<Region[]> => {
    const regions = await regionDB.getChildren({ parentId });
    return regions;
};

export default { getRegions, getRegionById, getRegionsByName, getRegionsByType, createRegion, getChildren };
import { Region } from '../model/region';
import regionDB from '../repository/region.db';
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

const createRegion = async({}: RegionInput): Promise<Region> => {
    throw new Error("UNIMPLEMENTED");
}

const getChildren = async (parentId: number): Promise<Region[]> => {
    const regions = await regionDB.getChildren({ parentId });
    return regions;
};

export default { getRegions, getRegionById, getRegionsByName, getRegionsByType, createRegion, getChildren };
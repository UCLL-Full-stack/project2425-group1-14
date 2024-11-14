import { Region } from '../model/region';
import { Type } from '../model/type';

const regions: Region[] = [];

const getRegions = (): Region[] => regions;

const getRegionById = (r: {id: number}): Region | undefined => {
    return regions.find((region: Region) => region.getId() === r.id);
};

const getRegionsByName = (r: {name: string}): Region[] => {
    return regions.filter((reg: Region) => {reg.getName().includes(r.name)});
};

const getRegionsByType = (r: {type: Type}): Region[] => {
    return regions.filter((reg: Region) => {reg.getType() === r.type});
};

const createRegion = (region: Region) => {
    regions.push(region);
    return regions.at(-1);
};

const getChildren = (r: {id: number}) => {
    const region = getRegionById(r);
    return regions.filter((reg: Region) => {reg.getParent() === region});
};

export default {
    getRegions,
    getRegionById,
    getRegionsByName,
    getRegionsByType,
    createRegion,
    getChildren
};

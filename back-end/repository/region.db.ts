import database from '../util/database';
import { Region } from '../model/region';
import { RepositoryError } from '../types/error';

const getRegions = async (): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            include: { type: true, parent: { include: { type: true } } },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getRegionById = async ({ id }: { id: number }): Promise<Region | null> => {
    try {
        const regionPrisma = await database.region.findUnique({
            where: { id: id },
            include: { type: true, parent: { include: { type: true } } },
        });

        return regionPrisma ? Region.from(regionPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getRegionsByName = async ({ name }: { name: string }): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            where: { name: { contains: name } },
            include: { type: true, parent: { include: { type: true } } },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getRegionByNameAndType = async ({
    name,
    typeId,
}: {
    name: string;
    typeId: number;
}): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            where: { name: { equals: name }, typeId: { equals: typeId } },
            include: { type: true, parent: { include: { type: true } } },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getRegionsByNameAndType = async ({
    name,
    typeId,
}: {
    name: string;
    typeId: number;
}): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            where: { name: { contains: name }, typeId: { equals: typeId } },
            include: { type: true, parent: { include: { type: true } } },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getRegionsByType = async ({ typeId }: { typeId: number }): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            where: { typeId: typeId },
            include: { type: true, parent: { include: { type: true } } },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const createRegion = async ({ name, type, parent }: Region): Promise<Region> => {
    try {
        const regionPrisma = await database.region.create({
            data: {
                name: name,
                type: { connect: { id: type.id } },
                parent: parent ? { connect: { id: parent.id } } : undefined,
            },
            include: { type: true, parent: { include: { type: true } } },
        });

        return Region.from(regionPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getChildren = async ({ parentId }: { parentId: number }): Promise<Region[]> => {
    try {
        const regionsPrisma = await database.region.findMany({
            where: { parentId: parentId },
            include: { type: true, parent: false },
        });
        return regionsPrisma.map((regionPrisma) => Region.from(regionPrisma));
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getParents = async ({ childId }: { childId: number }): Promise<Region[]> => {
    var parents: Region[] = [];
    try {
        var childRegion = await getRegionById({ id: childId });
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }

    while (childRegion != null && childRegion.parent) {
        parents.push(childRegion.parent);
        var childRegion = await getRegionById({ id: childId });
    }
    return parents;
};

export default {
    getRegions,
    getRegionById,
    getRegionsByName,
    getRegionByNameAndType,
    getRegionsByNameAndType,
    getRegionsByType,
    createRegion,
    getChildren,
    getParents,
};

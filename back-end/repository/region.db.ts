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

const countRegions = async (): Promise<Number> => {
    try {
        const countPrisma = await database.region.count();
        return countPrisma;
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

const getDescendants = async ({ parentId }: { parentId: number }): Promise<Region[]> => {
    try {
        var children: Region[] = [];

        var childRegions = await getChildren({ parentId: parentId });

        while (childRegions.some((c) => c !== null)) {
            var layer: Region[][] = [];
            for (const childRegion of childRegions) {
                if (childRegion != null) {
                    children.push(childRegion);
                }
            }
            for (const childRegion of childRegions) {
                if (childRegion == null) {
                    continue;
                }
                if (childRegion.id === undefined) {
                    throw new RepositoryError('Child region somehow has an undefined ID.');
                }
                layer.push(await getChildren({ parentId: childRegion.id }));
            }
            childRegions = [];
            for (const arr of layer) {
                childRegions.push(...arr);
            }
        }
        return children;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const getParents = async ({ childId }: { childId: number }): Promise<Region[]> => {
    try {
        var parents: Region[] = [];

        var childRegion = await getRegionById({ id: childId });

        while (childRegion != null && childRegion.parent) {
            parents.push(childRegion.parent);
            if (childRegion.parent.id == null) {
                throw new RepositoryError('Parent somehow has null ID');
            }
            var childRegion = await getRegionById({ id: childRegion.parent.id });
        }
        return parents;
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const deleteRegionById = async ({ id }: { id: number }): Promise<String> => {
    try {
        const nonVoterCount = await database.user.count({
            where: { locationId: id, role: {not: 'voter'} },
        });
        if (nonVoterCount > 0) {
            throw new RepositoryError("There are users with the region");
        }
        const ballotPrisma = await database.ballot.deleteMany({
            where: { locationId: id },
        });
        const userPrisma = await database.user.deleteMany({
            where: { locationId: id, role: 'voter' },
        });
        const regionsPrisma = await database.region.deleteMany({
            where: { id: id },
        });
        return `Deleted ${ballotPrisma.count} Ballots, ${userPrisma} Users and ${regionsPrisma.count} Regions.`;
    } catch (error) {
        console.error(error);
        throw new RepositoryError(
            "Database error. See server log for details.\nIf you're not a server admin, please make sure any Ballots, Users, VoterBallots or BallotParties have been deleted or moved first."
        );
    }
};

const changeRegionName = async ({ id, name }: { id: number; name: string }): Promise<Region> => {
    try {
        const regionPrisma = await database.region.update({
            where: { id: id },
            data: {
                name: name,
            },
            include: { type: true, parent: { include: { type: true } } },
        });
        return Region.from(regionPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError('Database error. See server log for details.');
    }
};

const changeRegionParent = async ({
    id,
    parentId,
}: {
    id: number;
    parentId: number;
}): Promise<Region> => {
    try {
        const childRec = await getDescendants({ parentId });
        if (childRec.map((c) => c.id).includes(parentId)) {
            throw new RepositoryError(`Region with ${parentId} is already a child of region ${id}`);
        }
        const regionPrisma = await database.region.update({
            where: { id: id },
            data: {
                parent: { connect: { id: parentId } },
            },
            include: { type: true, parent: { include: { type: true } } },
        });
        return Region.from(regionPrisma);
    } catch (error) {
        console.error(error);
        throw new RepositoryError(
            'Database error. See server log for details. Check if the provided parent ID is not a child of the provided region.'
        );
    }
};

export default {
    getRegions,
    countRegions,
    getRegionById,
    getRegionsByName,
    getRegionByNameAndType,
    getRegionsByNameAndType,
    getRegionsByType,
    createRegion,
    getChildren,
    getDescendants,
    getParents,
    deleteRegionById,
    changeRegionName,
    changeRegionParent,
};

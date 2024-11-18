/**
 * @swagger
 * components:
 *  schemas:
 *   Region:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     type:
 *      $ref: '#/components/schemas/Type'
 *     parent:
 *      $ref: '#/components/schemas/Region'
 *   RegionInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     typeId:
 *      type: number
 *      format: int64
 *     parentId:
 *      type: number
 *      format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import regionService from '../service/region.service';
import { RegionInput } from '../types';

const regionRouter = express.Router();

regionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getRegions();
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = await regionService.getRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

regionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = <RegionInput>req.body;
        console.log(region);
        const result = await regionService.createRegion(region);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id/children', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getChildren(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

regionRouter.get(
    '/:id/childrenRecursive',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const regions = await regionService.getChildrenRecursive(Number(req.params.id));
            res.status(200).json(regions);
        } catch (error) {
            next(error);
        }
    }
);

regionRouter.get('/:id/parents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getParents(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

// getRegions, getRegionById, getRegionsByName, getRegionsByType, getRegionsByNameAndType, createRegion, getChildren, getChildrenRecursive, getParents, deleteRegionById, changeRegionName, changeRegionParent,

export { regionRouter };

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
import { ControllerError } from '../types/error';

const regionRouter = express.Router();

/**
 * @swagger
 * /regions:
 *  get:
 *   summary: Get a list of all regions.
 *   responses:
 *    200:
 *     description: A list of all regions.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Region'
 */
regionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getRegions();
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/{id}:
 *  get:
 *   summary: Get a region by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The region id.
 *   responses:
 *    200:
 *     description: A region.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Region'
 */
regionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = await regionService.getRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/by:
 *  get:
 *   summary: Get regions by name, type, or both.
 *   parameters:
 *    - in: query
 *      name: name
 *      type: string
 *      description: The region name.
 *    - in: query
 *      name: typeId
 *      type: number
 *      format: int64
 *      description: The type id.
 *   responses:
 *    200:
 *     description: A list of all regions.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Region'
 */
regionRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.typeId && req.query.name) {
            const region = await regionService.getRegionsByNameAndType(
                String(req.query.name),
                Number(req.query.typeId)
            );
            res.status(200).json(region);
        } else if (req.query.typeId) {
            const region = await regionService.getRegionsByType(Number(req.query.typeId));
            res.status(200).json(region);
        } else if (req.query.name) {
            const region = await regionService.getRegionsByName(String(req.query.name));
            res.status(200).json(region);
        } else {
            throw new ControllerError('Name or Type must be provided');
        }
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

/**
 * @swagger
 * /regions/{id}/children:
 *  get:
 *   summary: Get a list of all child regions.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: number
 *       format: int64
 *       required: true
 *       description: The type id.
 *   responses:
 *    200:
 *     description: A list of all first-level child regions.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Region'
 */
regionRouter.get('/:id/children', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getChildren(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/{id}/childrenRecursive:
 *  get:
 *   summary: Get a list of all child regions.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: number
 *       format: int64
 *       required: true
 *       description: The type id.
 *   responses:
 *    200:
 *     description: A list of all child regions.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Region'
 */
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

/**
 * @swagger
 * /regions/{id}/parents:
 *  get:
 *   summary: Get a list of all parent regions.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: number
 *       format: int64
 *       required: true
 *       description: The type id.
 *   responses:
 *    200:
 *     description: A list of all parent regions.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Region'
 */
regionRouter.get('/:id/parents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getParents(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/{id}:
 *  delete:
 *   summary: Delete a region by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The region id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
regionRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = await regionService.deleteRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

/*
    ✓✓ getRegions,
    ✓✓ getRegionById,
    ✓✓ getRegionsByName,
    ✓✓ getRegionsByType,
    ✓✓ getRegionsByNameAndType,
    ✓ createRegion,
    ✓✓ getChildren,
    ✓✓ getChildrenRecursive,
    ✓✓ getParents,
    ✓✓ deleteRegionById,
    changeRegionName,
    changeRegionParent,
*/

export { regionRouter };

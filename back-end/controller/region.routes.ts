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

import express, { NextFunction, Response } from 'express';
import { Request } from "express-jwt";
import regionService from '../service/region.service';
import { RegionInput } from '../types';
import { ControllerError } from '../types/error';
import { permsAdmin, permsAll } from '../util/perms';

const regionRouter = express.Router();

/**
 * @swagger
 * /regions:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
        permsAll(req.auth);
        const regions = await regionService.getRegions();
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/id/{id}:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
regionRouter.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const region = await regionService.getRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/by:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
        permsAll(req.auth);
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

/**
 * @swagger
 * /regions:
 *  post:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
 *   summary: Create a new region.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/RegionInput'
 *   responses:
 *    200:
 *     description: The created region.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Region'
 */
regionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
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
 * /regions/children/{id}:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
regionRouter.get('/children/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const regions = await regionService.getChildren(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/descendants/{id}:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
regionRouter.get('/descendants/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const regions = await regionService.getDescendants(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/parents/{id}:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
regionRouter.get('/parents/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
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
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
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
        permsAdmin(req.auth);
        const region = await regionService.deleteRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/name:
 *  patch:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
 *   summary: Change a region's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/RegionInput'
 *   responses:
 *    200:
 *     description: A region object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Region'
 */
regionRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
        const regionInput = <RegionInput>req.body;
        const region = await regionService.changeRegionName(regionInput);
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /regions/parent:
 *  patch:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
 *   summary: Change a region's parent.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/RegionInput'
 *   responses:
 *    200:
 *     description: A region object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Region'
 */
regionRouter.patch('/parent', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
        const regionInput = <RegionInput>req.body;
        const region = await regionService.changeRegionParent(regionInput);
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

export { regionRouter };

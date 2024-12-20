/**
 * @swagger
 * components:
 *  schemas:
 *   Type:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *   TypeInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 */

import express, { NextFunction, Response } from 'express';
import { Request } from "express-jwt";
import typeService from '../service/type.service';
import { TypeInput } from '../types';
import { ControllerError } from '../types/error';
import { permsAdmin, permsAll } from '../util/perms';

const typeRouter = express.Router();

/**
 * @swagger
 * /types:
 *  get:
 *   tags:
 *    - type
 *   security:
 *    - bearerAuth: []
 *   summary: Get a list of all types.
 *   responses:
 *    200:
 *     description: A list of all types.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Type'
 */
typeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const types = await typeService.getTypes();
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /types/id/{id}:
 *  get:
 *   tags:
 *    - region
 *   security:
 *    - bearerAuth: []
 *   summary: Get a type by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The type id.
 *   responses:
 *    200:
 *     description: A type.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const type = await typeService.getTypeById(Number(req.params.id));
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /types/by:
 *  get:
 *   tags:
 *    - type
 *   security:
 *    - bearerAuth: []
 *   summary: Get a type by id or name.
 *   parameters:
 *    - in: query
 *      name: name
 *      type: string
 *      description: The type name.
 *    - in: query
 *      name: id
 *      type: number
 *      format: int64
 *      description: The type id.
 *   responses:
 *    200:
 *     description: A type object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        if (req.query.id) {
            const type = await typeService.getTypeById(Number(req.query.id));
            res.status(200).json(type);
        } else if (req.query.name) {
            const type = await typeService.getTypeByName(String(req.query.name));
            res.status(200).json(type);
        } else {
            throw new ControllerError('ID or Name must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types:
 *  post:
 *   tags:
 *    - type
 *   security:
 *    - bearerAuth: []
 *   summary: Create a new type.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/TypeInput'
 *   responses:
 *    200:
 *     description: The created type.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
        const type = <TypeInput>req.body;
        console.log(type);
        const result = await typeService.createType(type);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/{id}:
 *  delete:
 *   tags:
 *    - type
 *   security:
 *    - bearerAuth: []
 *   summary: Delete a type by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The type id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
typeRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
        const type = await typeService.deleteTypeById(Number(req.params.id));
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/name:
 *  patch:
 *   tags:
 *    - type
 *   security:
 *    - bearerAuth: []
 *   summary: Change a type's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/TypeInput'
 *   responses:
 *    200:
 *     description: A type object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAdmin(req.auth);
        const typeInput = <TypeInput>req.body;
        const type = await typeService.changeTypeName(typeInput);
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});

export { typeRouter };

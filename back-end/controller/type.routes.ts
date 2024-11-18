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

import express, { NextFunction, Request, Response } from 'express';
import typeService from '../service/type.service';
import { TypeInput } from '../types';

const typeRouter = express.Router();

/**
 * @swagger
 * /types:
 *  get:
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
        const types = await typeService.getTypes();
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/{id}:
 *  get:
 *   summary: Get a type by id.
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
 *     description: A type object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const type = await typeService.getTypeById(Number(req.params.id));
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/{name}:
 *  get:
 *   summary: Get a type by name.
 *   parameters:
 *    - in: path
 *      name: name
 *      schema:
 *       type: string
 *       required: true
 *       description: The type name.
 *   responses:
 *    200:
 *     description: A type object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Type'
 */
typeRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const type = await typeService.getTypeByName(String(req.params.name));
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types:
 *  post:
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
        const typeInput = <TypeInput>req.body;
        const type = await typeService.changeTypeName(typeInput);
        res.status(200).json(type);
    } catch (error) {
        next(error);
    }
});

//  getTypes, getTypeById, getTypeByName, createType, deleteTypeById, changeTypeName

export { typeRouter };

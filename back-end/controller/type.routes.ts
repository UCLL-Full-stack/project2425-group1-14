/**
 * @swagger
 *   components:
 *    schemas:
 *      Type:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *      TypeInput:
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 */

import express, { Request, Response } from 'express';
import typeService from '../service/type.service';
import { TypeInput } from '../types';

const typeRouter = express.Router();

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get a list of all types.
 *     responses:
 *       200:
 *         description: A list of all types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Type'
 */
typeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const types = await typeService.getTypes();
        res.status(200).json(types);
    } catch (error) {
        let errotype = error as unknown as Error;
        res.status(400).json({ status: 'error', errorMessage: errotype.message });
    }
});

/**
 * @swagger
 * /types/{id}:
 *  get:
 *      summary: Get a type by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The type id.
 *      responses:
 *          200:
 *              description: A type object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Type'
 */
typeRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const type = await typeService.getTypeById(Number(req.params.id));
        res.status(200).json(type);
    } catch (error) {
        let errotype = error as unknown as Error;
        res.status(400).json({ status: 'error', errorMessage: errotype.message });
    }
});

/**
 * @swagger
 * /types:
 *   post:
 *      summary: Create a new type.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TypeInput'
 *      responses:
 *         200:
 *            description: The created type.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Type'
 */
typeRouter.post('/', async (req: Request, res: Response) => {
    try {
        const type = <TypeInput>req.body;
        console.log(type)
        const result = await typeService.createType(type);
        res.status(200).json(result);
    } catch (error) {
        let errotype = error as unknown as Error;
        res.status(400).json({ status: 'error', errorMessage: errotype.message });
    }
});

export { typeRouter };
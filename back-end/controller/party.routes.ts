/**
 * @swagger
 * components:
 *  schemas:
 *   Party:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     abbr:
 *      type: string
 *     logo:
 *      type: string
 *     type:
 *      $ref: '#/components/schemas/Type'
 *   PartyInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     abbr:
 *      type: string
 *     logo:
 *      type: string
 *     typeId:
 *      type: number
 *      format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import partyService from '../service/party.service';
import { PartyInput } from '../types';
import { ControllerError } from '../types/error';

const partyRouter = express.Router();

/**
 * @swagger
 * /parties:
 *  get:
 *   summary: Get a list of all parties.
 *   responses:
 *    200:
 *     description: A list of all parties.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Party'
 */
partyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parties = await partyService.getParties();
        res.status(200).json(parties);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/{id}:
 *  get:
 *   summary: Get a party by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The party id.
 *   responses:
 *    200:
 *     description: A party.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const party = await partyService.getPartyById(Number(req.params.id));
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /types/by:
 *  get:
 *   summary: Get parties by name, type, or both.
 *   parameters:
 *    - in: query
 *      name: name
 *      type: string
 *      description: The party name.
 *    - in: query
 *      name: typeId
 *      type: number
 *      format: int64
 *      description: The type id.
 *   responses:
 *    200:
 *     description: A list of all parties.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Party'
 */
partyRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.typeId && req.query.name) {
            const party = await partyService.getPartiesByNameAndType(
                String(req.query.name),
                Number(req.query.typeId)
            );
            res.status(200).json(party);
        } else if (req.query.typeId) {
            const party = await partyService.getPartiesByType(Number(req.query.typeId));
            res.status(200).json(party);
        } else if (req.query.name) {
            const party = await partyService.getPartiesByName(String(req.query.name));
            res.status(200).json(party);
        } else {
            throw new ControllerError('Name or Type must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/{id}/candidates:
 *  get:
 *   summary: Get a party's candidates by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The party id.
 *   responses:
 *    200:
 *     description: A list of candidates.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Candidate'
 */
partyRouter.get('/:id/candidates', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const candidates = await partyService.getCandidatesByParty(Number(req.params.id));
        res.status(200).json(candidates);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties:
 *  post:
 *   summary: Create a new party.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/PartyInput'
 *   responses:
 *    200:
 *     description: The created party.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const party = <PartyInput>req.body;
        console.log(party);
        const result = await partyService.createParty(party);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/{id}:
 *  delete:
 *   summary: Delete a party by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The party id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
partyRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const party = await partyService.deletePartyById(Number(req.params.id));
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/name:
 *  patch:
 *   summary: Change a party's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/PartyInput'
 *   responses:
 *    200:
 *     description: A party object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partyInput = <PartyInput>req.body;
        const party = await partyService.changePartyName(partyInput);
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/abbr:
 *  patch:
 *   summary: Change a party's abbreviation.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/PartyInput'
 *   responses:
 *    200:
 *     description: A party object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.patch('/abbr', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partyInput = <PartyInput>req.body;
        const party = await partyService.changePartyAbbr(partyInput);
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/logo:
 *  patch:
 *   summary: Change a party's logo.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/PartyInput'
 *   responses:
 *    200:
 *     description: A party object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.patch('/logo', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partyInput = <PartyInput>req.body;
        const party = await partyService.changePartyLogo(partyInput);
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/type:
 *  patch:
 *   summary: Change a party's type.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/PartyInput'
 *   responses:
 *    200:
 *     description: A party object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Party'
 */
partyRouter.patch('/type', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partyInput = <PartyInput>req.body;
        const party = await partyService.changePartyType(partyInput);
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

export { partyRouter };

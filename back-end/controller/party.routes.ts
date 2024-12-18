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

import express, { NextFunction, Response } from 'express';
import { Request } from "express-jwt";
import partyService from '../service/party.service';
import { PartyInput } from '../types';
import { ControllerError } from '../types/error';
import { permsManager, permsAll } from '../util/perms';

const partyRouter = express.Router();

/**
 * @swagger
 * /parties:
 *  get:
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsAll(req.auth);
        const parties = await partyService.getParties();
        res.status(200).json(parties);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/id/{id}:
 *  get:
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
partyRouter.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const party = await partyService.getPartyById(Number(req.params.id));
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parties/by:
 *  get:
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsAll(req.auth);
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
 * /parties/candidates/{id}:
 *  get:
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
partyRouter.get('/candidates/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
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
 *   tags:
 *    - party
 *   security:
 *    - bearerAuth: []
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
        permsManager(req.auth);
        const partyInput = <PartyInput>req.body;
        const party = await partyService.changePartyType(partyInput);
        res.status(200).json(party);
    } catch (error) {
        next(error);
    }
});

export { partyRouter };

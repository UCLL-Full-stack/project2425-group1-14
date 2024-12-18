/**
 * @swagger
 * components:
 *  schemas:
 *   Ballot:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     system:
 *      type: string
 *     minimum:
 *      type: number
 *      format: int64
 *     maximum:
 *      type: number
 *      format: int64
 *     location:
 *      $ref: '#/components/schemas/Region'
 *   BallotInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     system:
 *      type: string
 *     minimum:
 *      type: number
 *      format: int64
 *     maximum:
 *      type: number
 *      format: int64
 *     locationId:
 *      type: number
 *      format: int64
 *   BallotParty:
 *    type: object
 *    properties:
 *     ballot:
 *      $ref: '#/components/schemas/Ballot'
 *     party:
 *      $ref: '#/components/schemas/Party'
 *   BallotPartyInput:
 *    properties:
 *     ballotId:
 *      type: number
 *      format: int64
 *     partyId:
 *      type: number
 *      format: int64
 */

import express, { NextFunction, Response } from 'express';
import { Request } from "express-jwt";
import ballotService from '../service/ballot.service';
import { BallotInput, BallotPartyInput } from '../types';
import { ControllerError } from '../types/error';
import { permsManager, permsAll } from '../util/perms';

const ballotRouter = express.Router();

/**
 * @swagger
 * /ballots:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a list of all ballots.
 *   responses:
 *    200:
 *     description: A list of all ballots.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Ballot'
 */
ballotRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const ballots = await ballotService.getBallots();
        res.status(200).json(ballots);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /count:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a count of all ballots
 *   responses:
 *    200:
 *     description: A ballot.
 *     content:
 *      text/plain:
 *       schema:
 *        type: number
 */
ballotRouter.get('/count', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const count = await ballotService.countBallots();
        res.status(200).set('Content-Type', 'text/plain').send(count);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /count/party:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a count of all ballotParties
 *   responses:
 *    200:
 *     description: A ballot.
 *     content:
 *      text/plain:
 *       schema:
 *        type: number
 */
ballotRouter.get('/count/party', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const count = await ballotService.countBallotParties();
        res.status(200).set('Content-Type', 'text/plain').send(count);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/id/{id}:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a ballot by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The ballot id.
 *   responses:
 *    200:
 *     description: A ballot.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Ballot'
 */
ballotRouter.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const ballot = await ballotService.getBallotById(Number(req.params.id));
        res.status(200).json(ballot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/by:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get ballots by region.
 *   parameters:
 *    - in: query
 *      name: locationId
 *      type: number
 *      format: int64
 *      description: The region id.
 *   responses:
 *    200:
 *     description: A list of all ballots.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Ballot'
 */
ballotRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        if (req.query.locationId) {
            const ballot = await ballotService.getBallotsByRegion(Number(req.query.locationId));
            res.status(200).json(ballot);
        } else {
            throw new ControllerError('Location must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots:
 *  post:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Create a new ballot.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotInput'
 *   responses:
 *    200:
 *     description: The created ballot.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Ballot'
 */
ballotRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballot = <BallotInput>req.body;
        console.log(ballot);
        const result = await ballotService.createBallot(ballot);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/parties/{id}:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a ballot's parties by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The ballot id.
 *   responses:
 *    200:
 *     description: A list of parties.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Party'
 */
ballotRouter.get('/parties/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const ballots = await ballotService.getPartiesByBallot(Number(req.params.id));
        res.status(200).json(ballots);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/votes/{id}:
 *  get:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Get a ballot's votes by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The ballot id.
 *   responses:
 *    200:
 *     description: A list of votes.
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 */
ballotRouter.get('/votes/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const ballots = await ballotService.getVotesByBallot(Number(req.params.id));
        res.status(200).json(ballots);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/{id}:
 *  delete:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Delete a ballot by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The ballot id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
ballotRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballot = await ballotService.deleteBallotById(Number(req.params.id));
        res.status(200).json(ballot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/name:
 *  patch:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Change a ballot's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotInput'
 *   responses:
 *    200:
 *     description: A ballot object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Ballot'
 */
ballotRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballotInput = <BallotInput>req.body;
        const ballot = await ballotService.changeBallotName(ballotInput);
        res.status(200).json(ballot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/minimum:
 *  patch:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Change a ballot's minimum.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotInput'
 *   responses:
 *    200:
 *     description: A ballot object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Ballot'
 */
ballotRouter.patch('/minimum', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballotInput = <BallotInput>req.body;
        const ballot = await ballotService.changeBallotMinimum(ballotInput);
        res.status(200).json(ballot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/maximum:
 *  patch:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Change a ballot's maximum.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotInput'
 *   responses:
 *    200:
 *     description: A ballot object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Ballot'
 */
ballotRouter.patch('/maximum', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballotInput = <BallotInput>req.body;
        const ballot = await ballotService.changeBallotMaximum(ballotInput);
        res.status(200).json(ballot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/party:
 *  post:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Add a party to a ballot.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotPartyInput'
 *   responses:
 *    200:
 *     description: A ballotParty object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/BallotParty'
 */
ballotRouter.post('/party', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballotPartyInput = <BallotPartyInput>req.body;
        const ballotParty = await ballotService.addPartyToBallot(ballotPartyInput);
        res.status(200).json(ballotParty);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ballots/party:
 *  delete:
 *   tags:
 *    - ballot
 *   security:
 *    - bearerAuth: []
 *   summary: Remove a party from a ballot.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/BallotPartyInput'
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
ballotRouter.delete('/party', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const ballotPartyInput = <BallotPartyInput>req.body;
        const ballotParty = await ballotService.removePartyFromBallot(ballotPartyInput);
        res.status(200).json(ballotParty);
    } catch (error) {
        next(error);
    }
});

export { ballotRouter };
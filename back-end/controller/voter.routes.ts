/**
 * @swagger
 * components:
 *  schemas:
 *   Voter:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     key:
 *      type: string
 *     location:
 *      $ref: '#/components/schemas/Region'
 *   VoterInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     key:
 *      type: string
 *     locationId:
 *      type: number
 *      format: int64
 *   VoterBallot:
 *    type: object
 *    properties:
 *     ballot:
 *      $ref: '#/components/schemas/Ballot'
 *     voter:
 *      $ref: '#/components/schemas/Voter'
 *   VoterBallotInput:
 *    properties:
 *     ballotId:
 *      type: number
 *      format: int64
 *     voterId:
 *      type: number
 *      format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import voterService from '../service/voter.service';
import { VoterInput } from '../types';
import { ControllerError } from '../types/error';

const voterRouter = express.Router();

/**
 * @swagger
 * /voters:
 *  get:
 *   tags:
 *    - voter
 *   summary: Get a list of all voters.
 *   responses:
 *    200:
 *     description: A list of all voters.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Voter'
 */
voterRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voters = await voterService.getVoters();
        res.status(200).json(voters);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/{id}:
 *  get:
 *   tags:
 *    - voter
 *   summary: Get a voter by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The voter id.
 *   responses:
 *    200:
 *     description: A voter.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voter = await voterService.getVoterById(Number(req.params.id));
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/by:
 *  get:
 *   tags:
 *    - voter
 *   summary: Get voters by region.
 *   parameters:
 *    - in: query
 *      name: locationId
 *      type: number
 *      format: int64
 *      description: The region id.
 *   responses:
 *    200:
 *     description: A list of all voters.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Voter'
 */
voterRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.locationId) {
            const voter = await voterService.getVotersByRegion(Number(req.query.locationId));
            res.status(200).json(voter);
        } else {
            throw new ControllerError('Location must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/email:
 *  get:
 *   tags:
 *    - voter
 *   summary: Get voter by email.
 *   parameters:
 *    - in: query
 *      name: email
 *      type: string
 *      description: The email.
 *   responses:
 *    200:
 *     description: A voter.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.get('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.locationId) {
            const voter = await voterService.getVotersByRegion(Number(req.query.locationId));
            res.status(200).json(voter);
        } else if (req.query.email) {
            const voter = await voterService.getVoterByEmail(String(req.query.email));
            res.status(200).json(voter);
        } else {
            throw new ControllerError('Location must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters:
 *  post:
 *   tags:
 *    - voter
 *   summary: Create a new voter.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/VoterInput'
 *   responses:
 *    200:
 *     description: The created voter.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voter = <VoterInput>req.body;
        console.log(voter);
        const result = await voterService.createVoter(voter);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/{id}:
 *  delete:
 *   tags:
 *    - voter
 *   summary: Delete a voter by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The voter id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
voterRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voter = await voterService.deleteVoterById(Number(req.params.id));
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/name:
 *  patch:
 *   tags:
 *    - voter
 *   summary: Change a voter's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/VoterInput'
 *   responses:
 *    200:
 *     description: A voter object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voterInput = <VoterInput>req.body;
        const voter = await voterService.changeVoterName(voterInput);
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/email:
 *  patch:
 *   tags:
 *    - voter
 *   summary: Change a voter's email.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/VoterInput'
 *   responses:
 *    200:
 *     description: A voter object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.patch('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voterInput = <VoterInput>req.body;
        const voter = await voterService.changeVoterEmail(voterInput);
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/key:
 *  patch:
 *   tags:
 *    - voter
 *   summary: Change a voter's key.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/VoterInput'
 *   responses:
 *    200:
 *     description: A voter object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.patch('/key', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voterInput = <VoterInput>req.body;
        const voter = await voterService.changeVoterKey(voterInput);
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /voters/region:
 *  patch:
 *   tags:
 *    - voter
 *   summary: Change a voter's region.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/VoterInput'
 *   responses:
 *    200:
 *     description: A voter object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Voter'
 */
voterRouter.patch('/region', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voterInput = <VoterInput>req.body;
        const voter = await voterService.changeVoterRegion(voterInput);
        res.status(200).json(voter);
    } catch (error) {
        next(error);
    }
});

export { voterRouter };

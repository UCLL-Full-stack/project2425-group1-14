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

const voterRouter = express.Router();

export { voterRouter };
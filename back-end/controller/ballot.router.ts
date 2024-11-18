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

import express, { NextFunction, Request, Response } from 'express';
import ballotService from '../service/ballot.service';
import { BallotInput } from '../types';

const ballotRouter = express.Router();

export { ballotRouter };
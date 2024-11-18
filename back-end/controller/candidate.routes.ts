/**
 * @swagger
 * components:
 *  schemas:
 *   Candidate:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     location:
 *      $ref: '#/components/schemas/Region'
 *   CandidateInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     name:
 *      type: string
 *     locationId:
 *      type: number
 *      format: int64
 *   PartyCandidate:
 *    type: object
 *    properties:
 *     candidate:
 *      $ref: '#/components/schemas/Candidate'
 *     party:
 *      $ref: '#/components/schemas/Party'
 *     position:
 *      type: number
 *      format: int64
 *   PartyCandidateInput:
 *    properties:
 *     candidateId:
 *      type: number
 *      format: int64
 *     partyId:
 *      type: number
 *      format: int64
 *     position:
 *      type: number
 *      format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import candidateService from '../service/candidate.service';
import { CandidateInput } from '../types';

const candidateRouter = express.Router();

export { candidateRouter };
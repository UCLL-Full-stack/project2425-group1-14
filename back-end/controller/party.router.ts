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

const partyRouter = express.Router();

export { partyRouter };
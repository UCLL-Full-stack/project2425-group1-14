// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *   Candidate:
//  *    type: object
//  *    properties:
//  *     id:
//  *      type: number
//  *      format: int64
//  *     name:
//  *      type: string
//  *     location:
//  *      $ref: '#/components/schemas/Region'
//  *   CandidateInput:
//  *    properties:
//  *     id:
//  *      type: number
//  *      format: int64
//  *     name:
//  *      type: string
//  *     locationId:
//  *      type: number
//  *      format: int64
//  *   PartyCandidate:
//  *    type: object
//  *    properties:
//  *     candidate:
//  *      $ref: '#/components/schemas/Candidate'
//  *     party:
//  *      $ref: '#/components/schemas/Party'
//  *     position:
//  *      type: number
//  *      format: int64
//  *   PartyCandidateInput:
//  *    properties:
//  *     candidateId:
//  *      type: number
//  *      format: int64
//  *     partyId:
//  *      type: number
//  *      format: int64
//  *     position:
//  *      type: number
//  *      format: int64
//  */

// import express, { NextFunction, Response } from 'express';
// import { Request } from "express-jwt";
// import candidateService from '../service/candidate.service';
// import { CandidateInput, PartyCandidateInput } from '../types';
// import { ControllerError } from '../types/error';
// import { permsManager, permsAll } from '../util/perms';

// const candidateRouter = express.Router();

// /**
//  * @swagger
//  * /candidates:
//  *  get:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Get a list of all candidates.
//  *   responses:
//  *    200:
//  *     description: A list of all candidates.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: array
//  *        items:
//  *         $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsAll(req.auth);
//         const candidates = await candidateService.getCandidates();
//         res.status(200).json(candidates);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/id/{id}:
//  *  get:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Get a candidate by id.
//  *   parameters:
//  *    - in: path
//  *      name: id
//  *      schema:
//  *       type: integer
//  *       required: true
//  *       description: The candidate id.
//  *   responses:
//  *    200:
//  *     description: A candidate.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsAll(req.auth);
//         const candidate = await candidateService.getCandidateById(Number(req.params.id));
//         res.status(200).json(candidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/by:
//  *  get:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Get candidates by region.
//  *   parameters:
//  *    - in: query
//  *      name: locationId
//  *      type: number
//  *      format: int64
//  *      description: The region id.
//  *   responses:
//  *    200:
//  *     description: A list of all candidates.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: array
//  *        items:
//  *         $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsAll(req.auth);
//         if (req.query.locationId) {
//             const candidate = await candidateService.getCandidatesByRegion(
//                 Number(req.query.locationId)
//             );
//             res.status(200).json(candidate);
//         } else {
//             throw new ControllerError('Location must be provided');
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/parties/{id}:
//  *  get:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Get a candidate's parties by id.
//  *   parameters:
//  *    - in: path
//  *      name: id
//  *      schema:
//  *       type: integer
//  *       required: true
//  *       description: The candidate id.
//  *   responses:
//  *    200:
//  *     description: A list of parties.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: array
//  *        items:
//  *         $ref: '#/components/schemas/Party'
//  */
// candidateRouter.get('/parties/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsAll(req.auth);
//         const candidates = await candidateService.getPartiesByCandidate(Number(req.params.id));
//         res.status(200).json(candidates);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates:
//  *  post:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Create a new candidate.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/CandidateInput'
//  *   responses:
//  *    200:
//  *     description: The created candidate.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const candidate = <CandidateInput>req.body;
//         console.log(candidate);
//         const result = await candidateService.createCandidate(candidate);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/{id}:
//  *  delete:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Delete a candidate by id.
//  *   parameters:
//  *    - in: path
//  *      name: id
//  *      schema:
//  *       type: integer
//  *       required: true
//  *       description: The candidate id.
//  *   responses:
//  *    200:
//  *     description: A string.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: string
//  */
// candidateRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const candidate = await candidateService.deleteCandidateById(Number(req.params.id));
//         res.status(200).json(candidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/name:
//  *  patch:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Change a candidate's name.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/CandidateInput'
//  *   responses:
//  *    200:
//  *     description: A candidate object.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const candidateInput = <CandidateInput>req.body;
//         const candidate = await candidateService.changeCandidateName(candidateInput);
//         res.status(200).json(candidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/region:
//  *  patch:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Change a candidate's region.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/CandidateInput'
//  *   responses:
//  *    200:
//  *     description: A candidate object.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/Candidate'
//  */
// candidateRouter.patch('/region', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const candidateInput = <CandidateInput>req.body;
//         const candidate = await candidateService.changeCandidateRegion(candidateInput);
//         res.status(200).json(candidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/party:
//  *  post:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Add a candidate to a party.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/PartyCandidateInput'
//  *   responses:
//  *    200:
//  *     description: A partyCandidate object.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/PartyCandidate'
//  */
// candidateRouter.post('/party', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const partyCandidateInput = <PartyCandidateInput>req.body;
//         const partyCandidate = await candidateService.addCandidateToParty(partyCandidateInput);
//         res.status(200).json(partyCandidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/party:
//  *  delete:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Remove a candidate from a party.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/PartyCandidateInput'
//  *   responses:
//  *    200:
//  *     description: A string.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: string
//  */
// candidateRouter.delete('/party', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const partyCandidateInput = <PartyCandidateInput>req.body;
//         const partyCandidate = await candidateService.removeCandidateFromParty(partyCandidateInput);
//         res.status(200).json(partyCandidate);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /candidates/party:
//  *  patch:
//  *   tags:
//  *    - candidate
//  *   security:
//  *    - bearerAuth: []
//  *   summary: Update the position of a partyCandidate.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       $ref: '#/components/schemas/PartyCandidateInput'
//  *   responses:
//  *    200:
//  *     description: A partyCandidate object.
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/PartyCandidate'
//  */
// candidateRouter.patch('/party', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         permsManager(req.auth);
//         const partyCandidateInput = <PartyCandidateInput>req.body;
//         const partyCandidate = await candidateService.changePartyCandidatePosition(
//             partyCandidateInput
//         );
//         res.status(200).json(partyCandidate);
//     } catch (error) {
//         next(error);
//     }
// });

// export { candidateRouter };

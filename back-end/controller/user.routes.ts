/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     username:
 *      type: string
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     password:
 *      type: string
 *     role:
 *      type: string
 *     location:
 *      $ref: '#/components/schemas/Region'
 *   UserInput:
 *    properties:
 *     id:
 *      type: number
 *      format: int64
 *     username:
 *      type: string
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     password:
 *      type: string
 *     role:
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
 *      $ref: '#/components/schemas/User'
 *   VoterBallotInput:
 *    properties:
 *     ballotId:
 *      type: number
 *      format: int64
 *     voterId:
 *      type: number
 *      format: int64
 *   AuthenticationResponse:
 *    properties:
 *     token:
 *      type: string
 *     username:
 *      type: string
 *     name:
 *      type: string
 *     role:
 *      type: string
 */

import express, { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { ControllerError } from '../types/error';
import { permsAdmin, permsManager, permsAll } from '../util/perms';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Get a list of all users.
 *   responses:
 *    200:
 *     description: A list of all users.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        const users = await userService.getUsers({ role: req.auth.role });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Get a user by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The user id.
 *   responses:
 *    200:
 *     description: A user.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != Number(req.params.id)) {
            permsManager(req.auth);
        }

        const user = await userService.getUserById(Number(req.params.id), { role: req.auth.role });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/by:
 *  get:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Get users by region.
 *   parameters:
 *    - in: query
 *      name: locationId
 *      type: number
 *      format: int64
 *      description: The region id.
 *   responses:
 *    200:
 *     description: A list of all users.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
userRouter.get('/by', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        if (req.query.locationId) {
            const user = await userService.getUsersByRegion(Number(req.query.locationId), {
                role: req.auth.role,
            });
            res.status(200).json(user);
        } else {
            throw new ControllerError('Location must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/email:
 *  get:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Get user by email.
 *   parameters:
 *    - in: query
 *      name: email
 *      type: string
 *      description: The email.
 *   responses:
 *    200:
 *     description: A user.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.get('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsManager(req.auth);
        if (req.query.email) {
            const user = await userService.getUserByEmail(String(req.query.email), {
                role: req.auth.role,
            });
            res.status(200).json(user);
        } else {
            throw new ControllerError('Email must be provided');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *  post:
 *   tags:
 *    - user
 *   summary: Sign up as a voter.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: The created voter.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createVoter(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *  post:
 *   tags:
 *    - user
 *   summary: Log in as a voter.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: An authentication token.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const authentication = await userService.authenticate(user);
        res.status(200).json(authentication);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Delete a user by id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: The user id.
 *   responses:
 *    200:
 *     description: A string.
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != Number(req.params.id)) {
            permsAdmin(req.auth);
        }

        const user = await userService.deleteUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/name:
 *  patch:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Change a user's name.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: A user object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.patch('/name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;

        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != userInput.id) {
            permsAdmin(req.auth);
        }

        const user = await userService.changeUserName(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/email:
 *  patch:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Change a user's email.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: A user object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.patch('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;

        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != userInput.id) {
            permsAdmin(req.auth);
        }

        const user = await userService.changeUserEmail(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/password:
 *  patch:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Change a user's password.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: A user object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.patch('/password', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;

        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != userInput.id) {
            permsAdmin(req.auth);
        }

        const user = await userService.changeUserPassword(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/region:
 *  patch:
 *   tags:
 *    - user
 *   security:
 *    - bearerAuth: []
 *   summary: Change a user's region.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInput'
 *   responses:
 *    200:
 *     description: A user object.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
userRouter.patch('/region', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;

        permsAll(req.auth);
        const userCheck = await userService.getUserByUsername(req.auth.username);
        if (userCheck.id != userInput.id) {
            permsAdmin(req.auth);
        }

        const user = await userService.changeUserRegion(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };

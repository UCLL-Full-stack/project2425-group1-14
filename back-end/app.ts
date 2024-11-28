import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { typeRouter } from './controller/type.routes';
import { regionRouter } from './controller/region.routes';
import { partyRouter } from './controller/party.routes';
import { candidateRouter } from './controller/candidate.routes';
import { userRouter } from './controller/user.routes';
import { ballotRouter } from './controller/ballot.routes';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'hanno',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
);

app.use('/types', typeRouter);
app.use('/regions', regionRouter);
app.use('/parties', partyRouter);
app.use('/candidates', candidateRouter);
app.use('/users', userRouter);
app.use('/ballots', ballotRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Hannọ API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hannọ API',
            version: '0.2.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'Unauthorized Error', message: err.message });
    } else if (err.name === 'ServiceError') {
        res.status(400).json({ status: 'Service Error', message: err.message });
    } else if (err.name === 'RepositoryError') {
        res.status(400).json({ status: 'RepositoryError', message: err.message });
    } else if (err.name === 'DomainError') {
        res.status(400).json({ status: 'Domain Error', message: err.message });
    } else {
        res.status(400).json({ status: 'Application Error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Hannọ API is running on port ${port}.`);
});

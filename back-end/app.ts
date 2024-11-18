import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { typeRouter } from './controller/type.routes';
import { regionRouter } from './controller/region.routes';
import { partyRouter } from './controller/party.router';
import { candidateRouter } from './controller/candidate.router';
import { voterRouter } from './controller/voter.router';
import { ballotRouter } from './controller/ballot.router';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/types', typeRouter);
app.use('/regions', regionRouter);
app.use('/parties', partyRouter);
app.use('/candidates', candidateRouter);
app.use('/voter', voterRouter);
app.use('/ballots', ballotRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Hannọ API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hannọ API',
            version: '1.0.0',
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
    } else if (err.name === 'DomainError') {
        res.status(400).json({ status: 'Domain Error', message: err.message });
    } else {
        res.status(400).json({ status: 'Application Error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Hannọ API is running on port ${port}.`);
});
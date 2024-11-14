import express, { Request, Response } from 'express';
import typeService from '../service/type.service';

const typeRouter = express.Router();

typeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const types = await typeService.getTypes();
        res.status(200).json(types);
    } catch (error) {
        let errotype = error as unknown as Error;
        res.status(400).json({ status: 'error', errorMessage: errotype.message });
    }
});

typeRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const type = await typeService.getTypeById(Number(req.params.id));
        res.status(200).json(type);
    } catch (error) {
        let errotype = error as unknown as Error;
        res.status(400).json({ status: 'error', errorMessage: errotype.message });
    }
});

export { typeRouter };
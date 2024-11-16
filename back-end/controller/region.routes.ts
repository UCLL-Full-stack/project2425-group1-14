import express, { NextFunction, Request, Response } from 'express';
import regionService from '../service/region.service';
import { RegionInput } from '../types';

const regionRouter = express.Router();

regionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getRegions();
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = await regionService.getRegionById(Number(req.params.id));
        res.status(200).json(region);
    } catch (error) {
        next(error);
    }
});

regionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = <RegionInput>req.body;
        console.log(region)
        const result = await regionService.createRegion(region);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id/children', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getChildren(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id/childrenRecursive', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getChildrenRecursive(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

regionRouter.get('/:id/parents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await regionService.getParents(Number(req.params.id));
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
});

export { regionRouter };
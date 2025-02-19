import { Request, Response } from 'express';

interface IBikeController {
    addBike(req: Request, res: Response): Promise<void>;
    listBikes(req: Request, res: Response): Promise<void>;
    sellBike(req: Request, res: Response): Promise<void>;
    filterBikesByColor(req: Request, res: Response): Promise<void>;
    filterBikesByPrice(req: Request, res: Response): Promise<void>;
    updateBikePrice(req: Request, res: Response): Promise<void>;
}

export default IBikeController;

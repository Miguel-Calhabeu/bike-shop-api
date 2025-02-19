import BikeService from '../services/BikeService';
import IBike from '../interfaces/IBike';
import IBikeController from '../interfaces/IBikeController';
import { Request, Response } from 'express';

class BikeController implements IBikeController{
    private service: BikeService;

    constructor() {
        this.service = new BikeService();
    }

    async addBike(req: Request, res: Response): Promise<void> {
        try {
            const bike = req.body as unknown as IBike;
            const newBike = await this.service.addBike(bike);
            res.status(201).json(newBike);
        } catch (error) {
            res.status(400).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }

    async listBikes(req: Request, res: Response): Promise<void> {
        try{
            const bikes = await this.service.listBikes();
            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }

    async sellBike(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const bike = await this.service.sellBike(id);
            res.status(200).json(bike);
        } catch (error) {
            res.status(404).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }

    async filterBikesByColor(req: Request, res: Response): Promise<void> {
        try {
            const color = req.query.color ? String(req.query.color) : undefined;
            const bikes = await this.service.filterBikesByColor(color);
            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }

    async filterBikesByPrice(req: Request, res: Response): Promise<void> {
        try {
            if (req.query.minPrice && isNaN(Number(req.query.minPrice))) {
                res.status(400).json({ "error": "minPrice precisa ser um número." });
                return;
            }
            if (req.query.maxPrice && isNaN(Number(req.query.maxPrice))) {
                res.status(400).json({ "error": "maxPrice precisa ser um número." });
                return;
            }
            const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
            const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
            const bikes = await this.service.filterBikesByPrice(minPrice, maxPrice);
            res.status(200).json(bikes);
        } catch (error) {
            res.status(400).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }

    async updateBikePrice(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { newPrice } = req.body;
            const bike = await this.service.updateBikePrice(id, newPrice);
            if (!bike) {
                res.status(404).json({ "error": "Bike not found" });
            } else {
                res.status(200).json(bike);
            }
        } catch (error) {
            res.status(500).json({ "error": (error as NodeJS.ErrnoException).message });
        }
    }
}

export default BikeController;

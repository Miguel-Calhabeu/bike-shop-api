import { Router } from 'express';
import BikeController from '../controllers/BikeController';

const router = Router();
const controller = new BikeController();

router.post('/', controller.addBike.bind(controller));
router.get('/', controller.listBikes.bind(controller));
router.delete('/:id', controller.sellBike.bind(controller));
router.get('/color', controller.filterBikesByColor.bind(controller));
router.get('/price', controller.filterBikesByPrice.bind(controller));
router.put('/price/:id', controller.updateBikePrice.bind(controller));

export default router;

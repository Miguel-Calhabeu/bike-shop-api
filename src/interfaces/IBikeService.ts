import IBike from '../interfaces/IBike';

interface IBikeService {
    addBike(bike: IBike): Promise<IBike>;
    listBikes(): Promise<IBike[]>;
    sellBike(id: string): Promise<IBike | null>;
    filterBikesByColor(color: string): Promise<IBike[]>;
    filterBikesByPrice(minPrice?: number, maxPrice?: number): Promise<IBike[]>;
    updateBikePrice(id: string, newPrice: number): Promise<IBike | null>;
}

export default IBikeService;

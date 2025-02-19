import IBikeService from "../interfaces/IBikeService";
import JsonBikeRepository from "../repositories/JsonBikeRepository";
import IBike from "../interfaces/IBike";
import { v4 as uuidv4 } from 'uuid';

class BikeService implements IBikeService{
    private repository: JsonBikeRepository;

    constructor() {
        this.repository = new JsonBikeRepository();
    }

    private async checkBikeExists(bike: IBike): Promise<IBike | undefined> {
        const bikes = await this.repository.findAll();
        for (const existingBike of bikes) {
            if (existingBike.brand === bike.brand && existingBike.model === bike.model && existingBike.color === bike.color && existingBike.gears === bike.gears) {
                return existingBike;
            }
        }
        return undefined;
    }

    async addBike(bike: IBike): Promise<IBike> {
        if (!bike.color || !bike.brand || !bike.model || bike.price == null || bike.gears == null) {
            throw new Error("Todos os campos obrigatórios (color, brand, model, price, gears) devem ser fornecidos.");
        }

        if (typeof bike.color !== "string") {
            throw new Error("A cor deve ser uma string.");
        }

        if (typeof bike.brand !== "string") {
            throw new Error("A marca deve ser uma string.");
        }

        if (typeof bike.model !== "string") {
            throw new Error("O modelo deve ser uma string.");
        }

        if (typeof bike.price !== "number" || bike.price <= 0) {
            throw new Error("O preço deve ser um número positivo.");
        }

        if (typeof bike.gears !== "number" || bike.gears < 1) {
            throw new Error("O número de marchas deve ser pelo menos 1.");
        }

        const exisintgBike = await this.checkBikeExists(bike);

        if (exisintgBike && exisintgBike.price !== bike.price) {
            throw new Error("Já existe uma bicicleta com a mesma marca, modelo e cor, mas com um preço diferente.");
        }

        if (exisintgBike) {
            this.repository.update(exisintgBike._id, { stock: exisintgBike.stock + 1 });
            return { ...exisintgBike, stock: exisintgBike.stock + 1 };
        }

        bike._id = uuidv4();
        bike.stock = 1;

        return this.repository.create(bike);
    }

    async listBikes(): Promise<IBike[]> {
        return this.repository.findAll();
    }

    async sellBike(id: string): Promise<IBike> {
        const bike = await this.repository.findById(id);
        if (!bike) {
            throw new Error("Bicicleta não encontrada.");
        }
        if (bike.stock <= 1) {
            const deletedBike = await this.repository.delete(id);
            if (!deletedBike) {
                throw new Error("Falha ao deletar a bicicleta.");
            }
            deletedBike.stock = 0;
            return deletedBike;
        }
        const updatedBike = await this.repository.update(id, { stock: bike.stock - 1 });
        if (!updatedBike) {
            throw new Error("Falha ao atualizar o estoque da bicicleta.");
        }
        return updatedBike;
    }

    async filterBikesByColor(color?: string): Promise<IBike[]> {
        if (!color) {
            throw new Error("A cor deve ser fornecida.");
        }
        if (!isNaN(Number(color))) {
            throw new Error("A cor não pode ser um número.");
        }
        const bikes = await this.repository.findAll();
        return bikes.filter(bike => bike.color === color);
    }

    async filterBikesByPrice(minPrice?: number, maxPrice?: number): Promise<IBike[]> {
        if (!minPrice && !maxPrice) {
            throw new Error("Pelo menos um dos parâmetros minPrice ou maxPrice deve ser fornecido.");
        }
        if (minPrice && maxPrice && minPrice > maxPrice) {
            throw new Error("minPrice deve ser menor ou igual a maxPrice.");
        }
        if (minPrice && minPrice <= 0) {
            throw new Error("minPrice deve ser um número positivo.");
        }
        if (maxPrice && maxPrice <= 0) {
            throw new Error("maxPrice deve ser um número positivo.");
        }
        const bikes = await this.repository.findAll();
        return bikes.filter(bike => {
            if (minPrice && maxPrice) {
                return bike.price >= minPrice && bike.price <= maxPrice;
            }
            else if (minPrice) {
                return bike.price >= minPrice;
            }
            else if (maxPrice) {
                return bike.price <= maxPrice;
            }
            return false;
        });
    }

    async updateBikePrice(id: string, newPrice?: number): Promise<IBike | null> {
        if (!newPrice) {
            throw new Error("O novo preço deve ser fornecido.");
        }
        if (typeof newPrice !== "number" || newPrice <= 0) {
            throw new Error("O preço deve ser um número positivo.");
        }
        return this.repository.update(id, { price: newPrice });
    }
}

export default BikeService;

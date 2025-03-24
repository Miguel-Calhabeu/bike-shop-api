import mongoose, { Document, Model } from 'mongoose';
import IBike from '../interfaces/IBike';
import IBikeRepository from '../interfaces/IBikeRepository';
import dotenv from 'dotenv';

dotenv.config();

// União de tipos IBike e Document
// A interface IBikeDocument é o tipo do Model do Mongoose pois conta com as propriedades de ambos os contextos.
interface IBikeDocument extends IBike, Document {}

const bikeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    bikeModel: { type: String, required: true },
    color: { type: String, required: true },
    gears: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const BikeModel: Model<IBikeDocument> = mongoose.model<IBikeDocument>('Bike', bikeSchema);

class MongoBikeRepository implements IBikeRepository {
    constructor() {
        // A conexão é aberta na instanciação da classe, dessa forma, apenas uma conexão é mantida durante todo o funcionamento da API para toda comunicação necessária.
        this.connect();
    }

    private async connect(): Promise<void> {
        if (mongoose.connection.readyState === 0) {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bikeShopDB';
            await mongoose.connect(uri);
        }
    }

    // Funciona como um adaptador entre a interface utilizada pelo Mongoose e a interface padrão da API.
    private DocumentToBike(document: IBikeDocument): IBike {
        return {
            bikeId: document.id,
            brand: document.brand,
            bikeModel: document.bikeModel,
            color: document.color,
            gears: document.gears,
            price: document.price,
            stock: document.stock,
        };
    }

    async create(bike: IBike): Promise<IBike> {
        await this.connect();
        const newBike = new BikeModel(bike);
        await newBike.save();
        return this.DocumentToBike(newBike);
    }

    async update(id: string, updateFields: Partial<IBike>): Promise<IBike | null> {
        await this.connect();
        const updatedBike = await BikeModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true }).exec();
        return updatedBike ? this.DocumentToBike(updatedBike) : null;
    }

    async delete(id: string): Promise<IBike | null> {
        await this.connect();
        const deletedBike = await BikeModel.findByIdAndDelete(id).exec();
        return deletedBike ? this.DocumentToBike(deletedBike) : null;
    }

    async findById(id: string): Promise<IBike | null> {
        await this.connect();
        const bike = await BikeModel.findById(id).exec();
        return bike ? this.DocumentToBike(bike) : null;
    }

    async findAll(): Promise<IBike[]> {
        await this.connect();
        const bikes = await BikeModel.find().exec();
        return bikes.map(this.DocumentToBike);
    }
}

export default MongoBikeRepository;

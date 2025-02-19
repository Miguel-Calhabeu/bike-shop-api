import { promises as fs } from 'fs';
import path from 'path';
import IBike from '../interfaces/IBike';
import IBikeRepository from '../interfaces/IBikeRepository';

const dbPath = path.resolve(__dirname, '../database/bikes.json');

class JsonBikeRepository implements IBikeRepository {
    async readDB(): Promise<IBike[]> {
        try {
            const data = await fs.readFile(dbPath, 'utf-8');
            if (data.trim() === '') {
                return [];
            }
            return JSON.parse(data);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                await fs.writeFile(dbPath, '[]');
                return [];
            }
            throw error;
        }
    }

    async writeDB(data: IBike[]): Promise<void> {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    }

    async create(bike: IBike): Promise<IBike> {
        const db = await this.readDB();
        db.push(bike);
        await this.writeDB(db);
        return bike;
    }

    async update(id: string, updateData: Partial<IBike>): Promise<IBike | null> {
        const db = await this.readDB();
        const bikeIndex = db.findIndex(bike => bike._id === id);
        if (bikeIndex === -1) {
            return null;
        }
        db[bikeIndex] = { ...db[bikeIndex], ...updateData };
        await this.writeDB(db);
        return db[bikeIndex];
    }

    async delete(id: string): Promise<IBike | null> {
        const db = await this.readDB();
        const bikeIndex = db.findIndex(bike => bike._id === id);
        if (bikeIndex === -1) {
            return null;
        }
        const bike = db.splice(bikeIndex, 1)[0];
        await this.writeDB(db);
        return bike;
    }

    async findById(id: string): Promise<IBike | null> {
        const db = await this.readDB();
        return db.find(bike => bike._id === id) || null;
    }

    async findAll(): Promise<IBike[]> {
        return this.readDB();
    }
}

export default JsonBikeRepository;

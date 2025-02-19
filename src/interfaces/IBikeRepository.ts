import IBike from './IBike';

interface IBikeRepository {
    readDB(): Promise<IBike[]>;
    writeDB(data: IBike[]): Promise<void>;
    create(bike: IBike): Promise<IBike>;
    update(id: string, updateData: Partial<IBike>): Promise<IBike | null>;
    delete(id: string): Promise<IBike | null>;
    findById(id: string): Promise<IBike | null>;
    findAll(): Promise<IBike[]>;
}

export default IBikeRepository;

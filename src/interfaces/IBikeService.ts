import IBike from '../interfaces/IBike';

// IBikeService é a interface que modela a entidade de Serviço no escopo interno da API.
// O Serviço é a entidade responsável pela validação das requisições e dados, garantindo a coerência das ações.
// Bicicletas recebidas pelo Serviço tem suas propriedades validadas em relação ao estado atual do Banco de dados e coerência geral da aplicação.
// O Serviço se comunica de maneira bilateral fazendo a ponte entre o Controlador e o Repositório.
// Controlador -> Serviço -> Repositório -> Serviço -> Controlador (fluxo geral)

interface IBikeService {
    addBike(bike: IBike): Promise<IBike>;
    listBikes(): Promise<IBike[]>;
    sellBike(id: string): Promise<IBike | null>;
    filterBikesByColor(color: string): Promise<IBike[]>;
    filterBikesByPrice(minPrice?: number, maxPrice?: number): Promise<IBike[]>;
    updateBikePrice(id: string, newPrice: number): Promise<IBike | null>;
}

export default IBikeService;

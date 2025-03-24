import IBike from './IBike';

// IBikeRepository é a interface que modela a entidade de Repositório no escopo interno da API.
// O Repositório é a entidade responsável pela comunicação com o banco de dados, possuindo ações semânticas coerentes.
// Bicicletas recebidas pelo Repositório são tratados para persistência no BD, sendo possível, também, retornar bicicletas persistidas no DB e trata-las para o contexto interno da aplicação.
// O Repositório se comunica de maneira bilateral fazendo a ponte entre o Serviço e o BD.
// Serviço -> Repositório -> Banco de dados (persistir)
// Serviço -> Repositório -> Banco de dados -> Repositório -> Serviço (retorno)

interface IBikeRepository {
    create(bike: IBike): Promise<IBike>;
    update(id: string, updateData: Partial<IBike>): Promise<IBike | null>;
    delete(id: string): Promise<IBike | null>;
    findById(id: string): Promise<IBike | null>;
    findAll(): Promise<IBike[]>;
}

export default IBikeRepository;

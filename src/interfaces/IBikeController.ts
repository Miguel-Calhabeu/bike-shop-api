import { Request, Response } from 'express';

// IBikeController é a interface que modela a entidade de Controlador no escopo interno da API.
// O Controlador é a entidade responsável pelo processamento das requisições e respostas.
// Requisições recebidas pelo Controlador são redirecionadas e eventualmente processadas pelo Serviço, responsável pela validação lógica no contexto da aplicação.
// O Controlador se comunica de maneira unilateral com o serviço, assim, sendo a ponta da aplicação em contato direto com as requisições HTTP.
// Requisição -> Controlador -> Serviço -> Controlador -> Resposta

interface IBikeController {
    addBike(req: Request, res: Response): Promise<void>;
    listBikes(req: Request, res: Response): Promise<void>;
    sellBike(req: Request, res: Response): Promise<void>;
    filterBikesByColor(req: Request, res: Response): Promise<void>;
    filterBikesByPrice(req: Request, res: Response): Promise<void>;
    updateBikePrice(req: Request, res: Response): Promise<void>;
}

export default IBikeController;

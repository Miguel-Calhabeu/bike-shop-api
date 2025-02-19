# Bike Shop API

## 📌 Visão Geral
A **Bike Shop API** é um serviço desenvolvido em **Node.js + Express + TypeScript** que permite o gerenciamento de bicicletas de um estabelecimento comercial. A API fornece operações básicas de **CRUD** para cadastrar, vender, alterar o preço e listar bicicletas disponíveis.

## 🚀 Tecnologias Utilizadas
- **Node.js** → Plataforma de execução JavaScript.
- **Express** → Framework para criação da API.
- **TypeScript** → Tipagem estática para maior segurança e organização do código.
- **UUID** → Identificadores únicos para bicicletas.
- **cors** → Configuração de políticas de requisição cross-origin.

## 📂 Estrutura do Projeto
```
📦 bike-shop-api
 ┣ 📂 src
 ┃ ┣ 📂 controllers   # Lógica das rotas
 ┃ ┣ 📂 models        # Definição do modelo de bicicleta
 ┃ ┣ 📂 routes        # Configuração das rotas da API
 ┃ ┣ 📂 services      # Regras de negócio
 ┃ ┣ 📂 repositories  # Persistência de dados
 ┃ ┣ 📂 database      # Configuração do banco de dados
 ┃ ┣ 📜 app.ts        # Configuração principal do Express
 ┣ 📜 .env            # Variáveis de ambiente
 ┣ 📜 package.json    # Dependências do projeto
 ┣ 📜 tsconfig.json   # Configurações do TypeScript
 ┣ 📜 README.md       # Documentação
```

## 📜 Endpoints da API
| Método     | Rota                                | Descrição                        |
| ---------- | ----------------------------------- | -------------------------------- |
| **POST**   | `/bikes`                            | Cadastrar uma bicicleta          |
| **DELETE** | `/bikes/:id`                        | Vender (remover) uma bicicleta   |
| **PATCH**  | `/bikes/:id/price`                  | Alterar o preço de uma bicicleta |
| **GET**    | `/bikes`                            | Listar todas as bicicletas       |
| **GET**    | `/bikes?color=vermelho`             | Filtrar bicicletas por cor       |
| **GET**    | `/bikes?minPrice=500&maxPrice=1500` | Filtrar bicicletas por preço     |

## 📜 Utilização da API
A API pode ser consumida através da URL: [VercelAPIApp](https://bike-shop-api.vercel.app/api)

## 📜 Licença
Este projeto está sob a licença **MIT**. Sinta-se livre para utilizá-lo e contribuir!

---
Desenvolvido com 💙 por Miguel Filippo Rocha Calhabeu

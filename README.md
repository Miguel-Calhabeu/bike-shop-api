# Bike Shop API

## 📌 Visão Geral
A **Bike Shop API** é um serviço desenvolvido em **Node.js + Express + TypeScript** que permite o gerenciamento de bicicletas de um estabelecimento comercial. A API fornece operações básicas de **CRUD** para cadastrar, vender, alterar o preço e listar bicicletas disponíveis.

## 🚀 Tecnologias Utilizadas
- **Node.js** → Plataforma de execução JavaScript.
- **Express** → Framework para criação da API.
- **TypeScript** → Tipagem estática para maior segurança e organização do código.
- **MongoDB + Mongoose** → Banco de dados NoSQL para persistência.
- **UUID** → Identificadores únicos para bicicletas.
- **dotenv** → Gerenciamento de variáveis de ambiente.
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

## 📦 Configuração do Ambiente
### **1️⃣ Clonar o repositório**
```sh
git clone https://github.com/seu-usuario/bike-shop-api.git
cd bike-shop-api
```

### **2️⃣ Instalar dependências**
```sh
npm install
```

### **3️⃣ Configurar as variáveis de ambiente**
Crie um arquivo **.env** na raiz do projeto e defina:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/bikeshop
```

### **4️⃣ Executar a aplicação**
Rodar o servidor em modo de desenvolvimento:
```sh
npm run dev
```
Ou compilar e executar:
```sh
npm run build && npm start
```

## 📜 Licença
Este projeto está sob a licença **MIT**. Sinta-se livre para utilizá-lo e contribuir!

---
Desenvolvido com 💙 por Miguel Filippo Rocha Calhabeu

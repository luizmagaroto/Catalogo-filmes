# Catálogo de Filmes

API REST simples em TypeScript com Node.js e Express para gerenciar um catálogo de filmes.

**Funcionalidades:** CRUD de filmes (título, ano, gênero, avaliação), integração com MongoDB via Prisma, validação básica, testes com Vitest.

Instalação:

```powershell
cd catalogo-filmes
npm install
```

## Configurar MongoDB (Prisma)

### Opção 1: MongoDB Local (Docker Compose) — RECOMENDADO PARA DESENVOLVIMENTO

1. Certifique-se de ter Docker e Docker Compose instalados.

2. Suba os containers MongoDB e Mongo Express:

```powershell
docker-compose up -d
```

3. Copie `.env.example` para `.env` (já vem com URL local configurada):

```powershell
copy .env.example .env
```

4. Gere o client Prisma e aplique o schema ao banco:

```powershell
npm run prisma:generate
npm run prisma:push
```

5. Acesse a interface visual do MongoDB:
   - **Mongo Express**: http://localhost:8081
   - **Prisma Studio**: `npm run prisma:studio`

6. Para parar os containers:

```powershell
docker-compose down
```

### Opção 2: MongoDB Atlas (Nuvem)

1. Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Edite `.env` e substitua a URL pela sua connection string do Atlas:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/catalogo?retryWrites=true&w=majority"
```

3. Execute Prisma:

```powershell
npm run prisma:generate
npm run prisma:push
```

## Scripts disponíveis

```powershell
npm run dev       
npm run build     
npm start       
npm run lint      
npm run format   
npm test          
npm run prisma:generate  
npm run prisma:push     
npm run prisma:studio    
```

### Docker (para MongoDB local)

```powershell
docker-compose up -d      
docker-compose down       
docker-compose logs -f    
```

## 🧪 Testando a API

### Opção 1: Script PowerShell (Windows)

```powershell
.\test-api.ps1
```

Isso vai automaticamente:
1. Listar filmes
2. Criar um novo filme
3. Obter filme por ID
4. Atualizar filme
5. Deletar filme
6. Verificar resultado final

### Opção 2: Script Bash (Linux/Mac)

```bash
bash test-api.sh
```

### Opção 3: Postman

1. Importe `postman-collection.json` no Postman
2. Altere a variável `{{MOVIE_ID}}` nos requests que precisarem
3. Execute os requests na ordem desejada

### Opção 4: curl (manual)

```bash
curl http://localhost:3000/api/movies

curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","year":2010,"genre":"Sci-Fi","rating":8.8}'

curl http://localhost:3000/api/movies/<ID_DO_FILME>

curl -X PUT http://localhost:3000/api/movies/<ID_DO_FILME> \
  -H "Content-Type: application/json" \
  -d '{"rating":9.0}'

curl -X DELETE http://localhost:3000/api/movies/<ID_DO_FILME>
```

## Endpoints

- `GET /api/movies` — lista todos os filmes
- `POST /api/movies` — criar novo filme
- `GET /api/movies/:id` — obter filme por ID
- `PUT /api/movies/:id` — atualizar filme
- `DELETE /api/movies/:id` — remover filme

## Observações

- Persistência: MongoDB com Prisma ORM.
- Validação: básica nos controllers (verificação de tipos e campos obrigatórios).
- Para rodar testes, é necessário uma instância MongoDB configurada e `DATABASE_URL` definido.

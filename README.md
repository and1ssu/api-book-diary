# Book Diary - Diário de Leitura

Uma aplicação completa para gerenciar sua coleção de livros, avaliar suas leituras e manter um diário literário pessoal.

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Joi (validação)


## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <https://github.com/and1ssu/api-book-diary.git>

```

2. Instale as dependências do backend:
```bash
cd api
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/book_diary?schema=public"
PORT=3000
NODE_ENV=development
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📚 API Endpoints

### Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/books | Lista todos os livros |
| GET | /api/books/:id | Busca um livro específico |
| POST | /api/books | Cria um novo livro |
| PUT | /api/books/:id | Atualiza um livro existente |
| DELETE | /api/books/:id | Remove um livro |

### Exemplos de Requisições

#### Criar um novo livro
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "rating": 5,
    "notes": "Um clássico da fantasia"
  }'
```

#### Listar todos os livros
```bash
curl http://localhost:3000/api/books
```

#### Atualizar um livro
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "notes": "Atualizado: Um clássico da fantasia"
  }'
```

#### Deletar um livro
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

## 📦 Estrutura do Projeto

```
book-diary/
├── api/                    # Backend
│   ├── src/
│   │   ├── controllers/    # Controladores
│   │   ├── routes/         # Rotas
│   │   ├── middlewares/    # Middlewares
│   │   ├── config/         # Configurações
│   │   ├── app.js          # Configuração do Express
│   │   └── server.js       # Ponto de entrada
│   ├── prisma/            # Configuração do Prisma
│   │   └── schema.prisma   # Schema do banco de dados
│   └── .env               # Variáveis de ambiente
│
└── frontend/              # Frontend
    ├── src/
    │   ├── components/    # Componentes React
    │   ├── pages/         # Páginas
    │   ├── services/      # Serviços de API
    │   └── hooks/         # Hooks personalizados
    └── public/            # Arquivos estáticos
```

## 🛠️ Modelo de Dados

### Book
```prisma
model Book {
  id        Int      @id @default(autoincrement())
  title     String
  author    String
  genre     String
  status    String
  rating    Int      @db.SmallInt
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
  user      User     @relation(fields: [userId], references: [id])

  @@map("books")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  books     Book[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### Enums
```prisma
enum Genre {
  Ficção
  NãoFicção
  Romance
  Mistério
  Fantasia
  Ciência
  História
  Biografia
  Autoajuda
  Outro
}

enum Status {
  NãoLido
  Lendo
  Lido
  Abandonado
}
```

## 🔍 Validação de Dados

O projeto utiliza Joi para validação de dados. Exemplo de schema de validação:

```javascript
const bookSchema = Joi.object({
  title: Joi.string().required().trim(),
  author: Joi.string().required().trim(),
  rating: Joi.number().required().min(1).max(5),
  notes: Joi.string().allow('').trim()
});
```



## 🖥️ Interface de Administração

O Prisma Studio está disponível para gerenciar os dados:
```bash
npx prisma studio
```
Acesse: http://localhost:5555






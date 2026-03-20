# Projeto 2 - API Completa com Banco de Dados

Uma API RESTful completa desenvolvida com Node.js, Express e MySQL para gerenciar tarefas, utilizadores, tags e comentários.

## 📋 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **Nodemon** - Monitor de desenvolvimento
- **Dotenv** - Variáveis de ambiente

## 🚀 Como Iniciar

### 1. Instalar Dependências

```bash
npm install
```

Instala todas as dependências necessárias listadas em `package.json`.

### 2. Configurar Banco de Dados

Execute o script de inicialização do banco:

```bash
mysql -u seu_usuario < database-init.sql
```

Ou importe o arquivo `database-init.sql` no seu cliente MySQL.

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env` em `src/`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=database
PORT=3000
```

### 4. Iniciar o Servidor

```bash
npm start
```

O servidor rodará em: `http://localhost:3000`

**Nota:** O servidor reinicia automaticamente ao salvar arquivos (nodemon ativado).

### 5. Parar o Servidor

Pressione `Ctrl+C` no terminal.

## 📁 Estrutura do Projeto

```
src/
├── app.js                 # Aplicação Express principal
├── db.js                  # Configuração do banco de dados
├── controllers/           # Controladores das rotas
│   ├── taskController.js
│   ├── tagController.js
│   └── userController.js
├── middlewares/           # Middlewares personalizados
│   ├── checkUserExists.js
│   └── loggerMiddleware.js
├── routes/                # Definição das rotas
│   ├── taskRoutes.js
│   ├── tagRoutes.js
│   └── userRoutes.js
└── services/              # Lógica de negócio
    ├── taskService.js
    ├── tagService.js
    ├── userService.js
    └── commentService.js
```

## 📡 Documentação das Rotas

### Tarefas (Tasks)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Buscar todas as tarefas |
| POST | `/tasks` | Criar nova tarefa |
| PUT | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Deletar tarefa |
| GET | `/tasks/stats` | Buscar estatísticas |

**Exemplo - Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nova Tarefa","responsavel":"João","categoria":"Backend"}'
```

### Tags

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tags` | Buscar todas as tags |
| POST | `/tags` | Criar nova tag |
| DELETE | `/tags/:id` | Deletar tag |
| GET | `/tags/:id/tasks` | Buscar tarefas por tag |

**Exemplo - Criar tag:**
```bash
curl -X POST http://localhost:3000/tags \
  -H "Content-Type: application/json" \
  -d '{"nome":"nova-tag"}'
```

### Utilizadores (Users)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Buscar todos os utilizadores |
| POST | `/users` | Criar novo utilizador |
| PUT | `/users/:id` | Atualizar utilizador |
| DELETE | `/users/:id` | Deletar utilizador |
| PATCH | `/users/:id` | Alternar status (ativo/inativo) |
| GET | `/users/stats` | Buscar estatísticas |

**Exemplo - Criar utilizador:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com"}'
```

### Comentários (em Tarefas)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/tasks/:id/comments` | Criar comentário |
| GET | `/tasks/:id/comments` | Buscar comentários |
| DELETE | `/tasks/:id/comments/:commentId` | Deletar comentário |

**Exemplo - Criar comentário:**
```bash
curl -X POST http://localhost:3000/tasks/1/comments \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"conteudo":"Esse é um comentário de teste"}'
```

### Tags em Tarefas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/tasks/:id/tags` | Adicionar tag à tarefa |
| GET | `/tasks/:id/tags` | Buscar tags da tarefa |
| DELETE | `/tasks/:id/tags` | Remover tag da tarefa |

**Exemplo - Adicionar tag:**
```bash
curl -X POST http://localhost:3000/tasks/1/tags \
  -H "Content-Type: application/json" \
  -d '{"tagId":1}'
```

### Busca e Ordenação

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks?search=termo&sort=asc` | Buscar tarefas com filtro |
| GET | `/users?search=termo&sort=asc` | Buscar utilizadores com filtro |

**Parâmetros de query:**
- `search` - Termo de busca (opcional)
- `sort` - Ordenação: `asc` (crescente) ou `desc` (decrescente)

**Exemplo - Buscar tarefas com filtro:**
```bash
curl "http://localhost:3000/tasks?search=API&sort=asc"
```

## 🧪 Testando a API

### Com cURL

Use os exemplos fornecidos em cada seção de rotas.

### Com PowerShell

Execute o script de testes automatizados:

```powershell
.\test-api-full.ps1
```

### Com Postman ou Insomnia

Importe as URLs das rotas listadas acima e faça as requisições.

## 🔍 Status HTTP

| Status | Significado |
|--------|-------------|
| 200 | OK - Operação bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Erro de validação |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

## ✅ Testes Realizados

- ✅ POST /tasks/1/tags - Adicionar tag (201)
- ✅ GET /tasks/1/tags - Buscar tags (200)
- ✅ DELETE /tasks/1/tags - Remover tag (200)
- ✅ POST /tasks/1/comments - Criar comentário (201)
- ✅ GET /tasks/1/comments - Buscar comentários (200)
- ✅ DELETE /tasks/1/comments/:commentId - Deletar comentário (200)

## 👨‍💻 Autor

Desenvolvido por **Danilson Sanches** @upskill217

## 📚 Referências

- [Documentação completa de testes](./TESTES_API.md)
- [Express.js Documentation](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)

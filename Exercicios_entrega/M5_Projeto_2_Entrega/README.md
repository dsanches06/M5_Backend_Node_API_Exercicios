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
package.json              # Dependências e scripts
database-init.sql         # Script de inicialização do banco
src/
├── .env                   # Variáveis de ambiente (criar localmente)
├── app.js                 # Aplicação Express principal
├── db.js                  # Configuração do banco de dados
├── controllers/           # Controladores das rotas
│   ├── taskController.js
│   ├── tagController.js
│   └── userController.js
├── middlewares/           # Middlewares personalizados
│   ├── authMiddleware.js
│   ├── checkUserExists.js
│   ├── errorHandler.js
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

### Com PowerShell (Recomendado)

Execute o script de testes automatizados que testa todos os endpoints:

```powershell
powershell -ExecutionPolicy Bypass -File test-api-full.ps1
```

Este script realiza 25 testes completos cobrindo todas as operações CRUD, validações e endpoints principais da API.

### Com Postman ou Insomnia

Importe as URLs das rotas listadas na seção "📡 Documentação das Rotas" e faça as requisições manualmente.

## 🔍 Status HTTP

| Status | Significado |
|--------|-------------|
| 200 | OK - Operação bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Erro de validação |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

## ✅ Testes Realizados

O script `test-api-full.ps1` executa **25 testes completos** cobrindo toda a API:

### Testes de GET (Listagem)
1. ✅ GET /tasks - Listar todas as tarefas
2. ✅ GET /users - Listar todos os utilizadores
3. ✅ GET /tags - Listar todas as tags
4. ✅ GET /users/stats - Estatísticas de utilizadores
5. ✅ GET /tasks/stats - Estatísticas de tarefas

### Testes de POST (Criação)
6. ✅ POST /users - Criar novo utilizador
7. ✅ POST /tags - Criar nova tag
8. ✅ POST /tasks - Criar nova tarefa
9. ✅ POST /tasks/:id/tags - Adicionar tag à tarefa
10. ✅ POST /tasks/:id/comments - Criar comentário

### Testes de Validação
11. ✅ POST /users (duplicate email) - Validar rejeição de emails duplicados
12. ✅ POST /tags (duplicate name) - Validar rejeição de nomes de tags duplicados

### Testes de PUT (Atualização)
13. ✅ PUT /users/:id - Atualizar utilizador
14. ✅ PUT /tasks/:id - Atualizar tarefa
15. ✅ PUT /tasks/:id/comments/:commentId - Atualizar comentário

### Testes de PATCH (Modificação Parcial)
16. ✅ PATCH /users/:id - Alternar status ativo/inativo
17. ✅ PATCH /tasks/:id/comments/:commentId - Marcar comentário como resolvido

### Testes de DELETE (Remoção)
18. ✅ DELETE /tasks/:id/tags/:tagId - Remover tag da tarefa
19. ✅ DELETE /tasks/:id/comments/:commentId - Deletar comentário
20. ✅ DELETE /tasks/:id - Deletar tarefa
21. ✅ DELETE /tags/:id - Deletar tag
22. ✅ DELETE /users/:id - Deletar utilizador (com validação de FK)

### Testes de GET com Relacionamentos
23. ✅ GET /tasks/:id/tags - Buscar tags de uma tarefa
24. ✅ GET /tasks/:id/comments - Buscar comentários de uma tarefa
25. ✅ GET /tags/:id/tasks - Buscar tarefas com uma tag

## 👨‍💻 Autor

Desenvolvido por **Danilson Sanches** @upskill217

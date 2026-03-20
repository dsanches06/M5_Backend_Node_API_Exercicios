# Projeto 1 - Primeira API Completa

## Como Aceder à Pasta do Projeto

### 1. Abrir a Pasta
```bash
cd projeto_1_entrega_danilson\
```
---

## Como Iniciar o Exercício

### 1. Instalar Dependências
Abra o CMD ou PowerShell na pasta do projeto e execute:
```cmd
npm install
```
Instala todas as dependências necessárias listadas em `package.json`.

### 2. Iniciar o Servidor
```cmd
npm start
```
Inicia o servidor com **nodemon** (reinicia automaticamente ao salvar arquivos).

O servidor rodará em: `http://localhost:3000`

### 3. Parar o Servidor
```cmd
Ctrl+C
```
Pressione Ctrl+C no terminal para parar o servidor.

## Documentação dos Testes da API

## Rotas de TAREFAS (Tasks)

### 1. Buscar todas as tarefas
```bash
curl http://localhost:3000/tasks
```
- **Método:** GET
- **Status esperado:** 200 OK

### 2. Criar tarefa
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nova Tarefa","responsavel":"João","categoria":"Backend"}'
```
- **Método:** POST
- **Status esperado:** 201 Created

### 3. Atualizar tarefa
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Tarefa Atualizada","responsavel":"Maria"}'
```
- **Método:** PUT
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 200 OK

### 4. Deletar tarefa
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
- **Método:** DELETE
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 200 OK

### 5. Buscar estatísticas das tarefas
```bash
curl http://localhost:3000/tasks/stats
```
- **Método:** GET
- **Status esperado:** 200 OK

---

## Rotas de TAGS em TAREFAS

### 6. Adicionar tag à tarefa
```bash
curl -X POST http://localhost:3000/tasks/1/tags \
  -H "Content-Type: application/json" \
  -d '{"tagId":1}'
```
- **Método:** POST
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 201 Created

### 7. Buscar tags da tarefa
```bash
curl http://localhost:3000/tasks/1/tags
```
- **Método:** GET
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 200 OK

### 8. Remover tag da tarefa
```bash
curl -X DELETE http://localhost:3000/tasks/1/tags \
  -H "Content-Type: application/json" \
  -d '{"tagId":1}'
```
- **Método:** DELETE
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 200 OK

---

## Rotas de COMENTÁRIOS em TAREFAS

### 9. Criar comentário
```bash
curl -X POST http://localhost:3000/tasks/1/comments \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"conteudo":"Esse é um comentário de teste"}'
```
- **Método:** POST
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 201 Created

### 10. Buscar comentários da tarefa
```bash
curl http://localhost:3000/tasks/1/comments
```
- **Método:** GET
- **Parâmetro:** :id (ID da tarefa)
- **Status esperado:** 200 OK

### 11. Deletar comentário
```bash
curl -X DELETE http://localhost:3000/tasks/1/comments/1
```
- **Método:** DELETE
- **Parâmetros:** :id (ID da tarefa), :commentId (ID do comentário)
- **Status esperado:** 200 OK

---

## Rotas de TAGS

### 12. Buscar todas as tags
```bash
curl http://localhost:3000/tags
```
- **Método:** GET
- **Status esperado:** 200 OK

### 13. Criar tag
```bash
curl -X POST http://localhost:3000/tags \
  -H "Content-Type: application/json" \
  -d '{"nome":"nova-tag"}'
```
- **Método:** POST
- **Status esperado:** 201 Created

### 14. Deletar tag
```bash
curl -X DELETE http://localhost:3000/tags/1
```
- **Método:** DELETE
- **Parâmetro:** :id (ID da tag)
- **Status esperado:** 200 OK

### 15. Buscar tarefas de uma tag
```bash
curl http://localhost:3000/tags/1/tasks
```
- **Método:** GET
- **Parâmetro:** :id (ID da tag)
- **Status esperado:** 200 OK

---

## Rotas de USUÁRIOS

### 16. Buscar todos os usuários
```bash
curl http://localhost:3000/users
```
- **Método:** GET
- **Status esperado:** 200 OK

### 17. Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com"}'
```
- **Método:** POST
- **Status esperado:** 201 Created

### 18. Atualizar usuário
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"João Atualizado","email":"joao.novo@example.com"}'
```
- **Método:** PUT
- **Parâmetro:** :id (ID do usuário)
- **Status esperado:** 200 OK

### 19. Deletar usuário
```bash
curl -X DELETE http://localhost:3000/users/1
```
- **Método:** DELETE
- **Parâmetro:** :id (ID do usuário)
- **Status esperado:** 200 OK

### 20. Alternar status ativo/inativo do usuário
```bash
curl -X PATCH http://localhost:3000/users/1
```
- **Método:** PATCH
- **Parâmetro:** :id (ID do usuário)
- **Status esperado:** 200 OK

### 21. Buscar estatísticas dos usuários
```bash
curl http://localhost:3000/users/stats
```
- **Método:** GET
- **Status esperado:** 200 OK

---

## Rotas de BUSCA E ORDENAÇÃO

### 22. Buscar tarefas com filtro
```bash
curl "http://localhost:3000/tasks?search=API&sort=asc"
```
- **Método:** GET
- **Query params:**
  - `search`: Termo de busca
  - `sort`: Ordenação (asc/desc)
- **Status esperado:** 200 OK

### 23. Buscar usuários com filtro
```bash
curl "http://localhost:3000/users?search=João&sort=asc"
```
- **Método:** GET
- **Query params:**
  - `search`: Termo de busca
  - `sort`: Ordenação (asc/desc)
- **Status esperado:** 200 OK

---

## Resumo de Status HTTP

| Status | Significado |
|--------|-------------|
| **200** | OK - Criação, atualização, deleção ou busca bem-sucedida |
| **201** | Created - Recurso criado com sucesso |
| **400** | Bad Request - Erro de validação (dados inválidos) |
| **404** | Not Found - Recurso não encontrado |
| **500** | Internal Server Error - Erro no servidor |

---

## Testes Realizados ✅

1. ✅ POST /tasks/1/tags - Adicionar tag (201)
2. ✅ GET /tasks/1/tags - Buscar tags (200)
3. ✅ DELETE /tasks/1/tags - Remover tag (200)
4. ✅ POST /tasks/1/comments - Criar comentário (201)
5. ✅ GET /tasks/1/comments - Buscar comentários (200)
6. ✅ DELETE /tasks/1/comments/:commentId - Deletar comentário (200)

---

<div align="center">

**Exercício realizado por Danilson Sanches @upskill217**

</div>


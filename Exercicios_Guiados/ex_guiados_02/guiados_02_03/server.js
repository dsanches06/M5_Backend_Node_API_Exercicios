const http = require("http");
const PORT = 3000;

/*  Exercício 1 — Criar lista de utilizadores */
//Cria um array users com objetos: id, name, email.
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
  { id: 4, name: "Diana", email: "diana@example.com" },
  { id: 5, name: "Eve", email: "eve@example.com" },
];

//Função auxiliar para ler o corpo da requisição
async function readBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  return body;
}

/* Exercício 5 — Criar tags */
//Cria um array tags com objetos: id, name.
let tags = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Node.js" },
  { id: 3, name: "Express" },
];

/* Exercício 6 — Adicionar tag a tarefa*/
//Cria um array taskTags para associar tarefas a tags: { taskId, tagId }
let taskTags = [];

/* Exercício 7 — Criar comentários */
//Cria um array comments com objetos: id, taskId, userId, content.
let comments = [
  { id: 1, taskId: 1, userId: 1, content: "Great task!" },
  {
    id: 2,
    taskId: 1,
    userId: 2,
    content: "I have a question about this task.",
  },
];

//Cria um servidor HTTP que responde a diferentes endpoints para gerir os utilizadores.
const server = http.createServer(async (req, res) => {
  //Parse da URL para obter pathname e searchParams
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  let body;
  let data;

  //Endpoint: GET /users — retorna todos os utilizadores.
  if (pathname === "/users") {
    switch (req.method) {
      case "GET":
        // Handle GET request
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
        break;
      case "POST":
        /* Exercício 2 — Criar novo utilizador */
        //Endpoint: POST /users
        body = await readBody(req);
        data = JSON.parse(body);
        const newUser = {
          id: users.length + 1,
          name: data.name,
          email: data.email,
        };
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
        break;
      case "PUT":
        /* Exercício 3 — Atualizar utilizador */
        //Endpoint: PUT /users
        body = await readBody(req);
        data = JSON.parse(body);
        const user = users.find((u) => u.id === data.id);
        if (user) {
          user.name = data.name;
          user.email = data.email;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404);
          res.end("User not found");
        }
        break;
      case "DELETE":
        /* Exercício 4 — Remover utilizador  */
        //Endpoint: DELETE /users
        body = await readBody(req);
        data = JSON.parse(body);
        users = users.filter((u) => u.id !== data.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User deleted" }));
        break;
      default:
        res.writeHead(404);
        res.end("User Not Found");
        break;
    }
    //Endpoint: GET /tags — retorna todas as tags.
  } else if (pathname === "/tags") {
    switch (req.method) {
      case "GET":
        // Handle GET request for tags
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tags));
        break;
      default:
        res.writeHead(404);
        res.end("Tag Not Found");
        break;
    }
  } else if (pathname === "/task-tags") {
    switch (req.method) {
      case "POST":
        //* Exercício 6 — Adicionar tag a tarefa */
        //Endpoint: POST /task-tags
        body = await readBody(req);
        data = JSON.parse(body);
        // Assuming taskTags is defined somewhere to store associations
        taskTags.push({ taskId: data.taskId, tagId: data.tagId });
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Tag associated to task" }));
        break;
      default:
        res.writeHead(404);
        res.end("Task Tag Not Found");
        break;
    }
  }

  //Endpoint: GET /comments?taskId=1 — retorna comentários de uma tarefa específica.
  else if (pathname === `/comments?taskId=${searchParams.get("taskId")}`) {
    switch (req.method) {
      case "GET":
        // Handle GET request for comments
        const taskId = parseInt(searchParams.get("taskId"));
        const filteredComments = comments.filter((c) => c.taskId === taskId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filteredComments));
        break;
      case "POST":
        /* Exercício 8 — Criar comentário */
        //Endpoint: POST /comments
        body = await readBody(req);
        data = JSON.parse(body);
        const newComment = {
          id: comments.length + 1,
          taskId: data.taskId,
          userId: data.userId,
          content: data.content,
        };
        comments.push(newComment);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newComment));
        break;

      default:
        res.writeHead(404);
        res.end("Task Comment Not Found");
        break;
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

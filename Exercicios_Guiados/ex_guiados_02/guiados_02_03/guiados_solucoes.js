const http = require("http");

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

let tags = [
  { id: 1, name: "Urgente" },
  { id: 2, name: "Frontend" }
];

let tasks = [
  { id: 1, title: "Criar layout", done: false },
  { id: 2, title: "Implementar login", done: false }
];

let taskTags = []; // { taskId, tagId }

let comments = []; // { id, taskId, userId, content, resolved }

let notifications = []; // { id, userId, message, read: false }

async function readBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  return body;
}

const server = http.createServer(async (req, res) => {

  const urlObj = new URL(req.url, "http://localhost:3000");
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  // ========== USERS ==========
  if (pathname === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } 
  else if (pathname === "/users" && req.method === "POST") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    const newUser = { id: users.length + 1, name: data.name, email: data.email };
    users.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  }
  else if (pathname === "/users" && req.method === "PUT") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    const user = users.find(u => u.id === data.id);
    if (user) {
      user.name = data.name;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end("User not found");
    }
  }
  else if (pathname === "/users" && req.method === "DELETE") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    users = users.filter(u => u.id !== data.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted" }));
  }

  // ========== TAGS ==========
  else if (pathname === "/tags" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tags));
  }

  // ========== TASK-TAGS ==========
  else if (pathname === "/task-tags" && req.method === "POST") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    taskTags.push({ taskId: data.taskId, tagId: data.tagId });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Tag associated to task" }));
  }

  // ========== COMMENTS ==========
  else if (pathname === "/comments" && req.method === "GET") {
    const taskId = parseInt(searchParams.get("taskId"));
    const filtered = comments.filter(c => c.taskId === taskId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filtered));
  } 
  else if (pathname === "/comments" && req.method === "POST") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    const newComment = {
      id: comments.length + 1,
      taskId: data.taskId,
      userId: data.userId,
      content: data.content,
      resolved: false
    };
    comments.push(newComment);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newComment));
  }
  else if (pathname === "/comments" && req.method === "PUT") {
    const body = await readBody(req);
    const data = JSON.parse(body);
    const comment = comments.find(c => c.id === data.id);
    if (comment) {
      comment.resolved = data.resolved;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comment));
    } else {
      res.writeHead(404);
      res.end("Comment not found");
    }
  }

  // ========== NOTIFICATIONS ==========
  else if (pathname === "/notifications" && req.method === "GET") {
    const userId = parseInt(searchParams.get("userId"));
    const filtered = notifications.filter(n => n.userId === userId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filtered));
  }

  // ========== ROTA NÃO ENCONTRADA ==========
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }

});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
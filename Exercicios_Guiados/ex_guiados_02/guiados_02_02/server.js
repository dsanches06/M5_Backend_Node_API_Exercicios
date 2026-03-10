const http = require("http");

let tasks = [
  { id: 1, title: "Estudar Node" }
];

async function readBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  return body;
}

const server = http.createServer(async (req, res) => {

  // GET /tasks
  if (req.method === "GET" && req.url === "/tasks") {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));

  }

  // POST /tasks
  else if (req.method === "POST" && req.url === "/tasks") {

    const body = await readBody(req);
    const data = JSON.parse(body);

    const newTask = {
      id: tasks.length + 1,
      title: data.title
    };

    tasks.push(newTask);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTask));
  }

  // PUT /tasks
  else if (req.method === "PUT" && req.url === "/tasks") {

    const body = await readBody(req);
    const data = JSON.parse(body);

    const task = tasks.find(t => t.id === data.id);

    if (task) {
      task.title = data.title;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    } else {
      res.writeHead(404);
      res.end("Task not found");
    }

  }

  // DELETE /tasks
  else if (req.method === "DELETE" && req.url === "/tasks") {

    const body = await readBody(req);
    const data = JSON.parse(body);

    tasks = tasks.filter(t => t.id !== data.id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Task deleted" }));

  }

  else {
    res.writeHead(404);
    res.end("Not found");
  }

});

server.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});
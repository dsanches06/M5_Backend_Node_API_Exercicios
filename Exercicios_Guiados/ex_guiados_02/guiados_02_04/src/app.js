const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      title: "Criar Login",
    },
    {
      id: 2,
      title: "Criar Dashboard",
    },
  ]);
});

app.post("/tasks", (req, res) => {
  const task = req.body;

  res.status(201).json({
    mensagem: "Tarefa criada com sucesso",
    task: task,
  });
});

app.get("/tasks/:id", (req, res) => {
  const id  = req.params.id;

  res.status(200).json({
    taskId: id,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let tasks = [
  {
    id: 1,
    titulo: "Criar protótipo",
    categoria: "Design",
    responsavel: "Alice",
    concluida: false,
    dataConclusao: undefined,
  },
  {
    id: 2,
    titulo: "Implementar API",
    categoria: "Backend",
    responsavel: "Bruno",
    concluida: false,
    dataConclusao: undefined,
  },
  {
    id: 3,
    titulo: "Testar funcionalidades",
    categoria: "QA",
    responsavel: "Carla",
    concluida: false,
    dataConclusao: undefined,
  },
];
let taskTags = [];

/* Função para buscar todas as tarefas */
export const getAllTasks = (search, sort) => {
  let result = [...tasks];

  if (search) {
    result = result.filter(
      (t) =>
        t.titulo.toLowerCase().includes(search.toLowerCase()) ||
        t.responsavel.toLowerCase().includes(search.toLowerCase()) ||
        t.categoria.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort && (sort === "asc" || sort === "desc")) {
    result.sort((a, b) => {
      const titleA = a.titulo.toLowerCase();
      const titleB = b.titulo.toLowerCase();

      if (sort === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
  }

  return result;
};

/* Função para criar tarefa */
export const createTask = (data) => {
  const task = {
    id: tasks.length + 1,
    titulo: data.titulo,
    categoria: data.categoria,
    responsavel: data.responsavel,
    concluida: false,
    dataConclusao: undefined,
  };

  tasks.push(task);
  return task;
};

/* Função para atualizar tarefa */
export const updateTask = (taskId, data) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  task.titulo = data.titulo ?? task.titulo;
  task.categoria = data.categoria ?? task.categoria;
  task.responsavel = data.responsavel ?? task.responsavel;
  task.concluida = data.concluida ?? task.concluida;

  if (task.concluida) {
    task.dataConclusao = new Date().toISOString();
  }
  return task;
};

/* Função para deletar tarefa */
export const deleteTask = (taskId) => {
  tasks = tasks.filter((t) => t.id !== taskId);
  taskTags = taskTags.filter((tt) => tt.taskId !== taskId);
};

/* Função para buscar tarefa por ID */
export const getTaskById = (taskId) => {
  return tasks.find((t) => t.id === taskId);
};

/* Função para adicionar tag à tarefa */
export const addTagToTask = (taskId, tagId) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const relationExists = taskTags.some(
    (tt) => tt.taskId === taskId && tt.tagId === tagId,
  );

  if (relationExists) {
    throw new Error("Tag already associated with task");
  }

  const relation = {
    taskId: taskId,
    tagId: tagId,
  };

  taskTags.push(relation);
  return relation;
};

/* Função para remover tag da tarefa */
export const removeTagFromTask = (taskId, tagId) => {
  const relationIndex = taskTags.findIndex(
    (tt) => tt.taskId === taskId && tt.tagId === tagId,
  );

  if (relationIndex === -1) {
    throw new Error("Tag not associated with task");
  }

  const relation = taskTags[relationIndex];
  taskTags.splice(relationIndex, 1);
  return relation;
};

/* Função para buscar tags de uma tarefa */
export const getTagsByTaskId = (taskId) => {
  return taskTags.filter((tt) => tt.taskId === taskId);
};

/* Função para remover tag de todas as tarefas */
export const removeTagFromAllTasks = (tagId) => {
  taskTags = taskTags.filter((tt) => tt.tagId !== tagId);
};

/* Função para buscar estatísticas das tarefas */
export const getTaskStats = () => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completedPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    completedPercentage: completedPercentage.toFixed(2) + "%",
  };
};

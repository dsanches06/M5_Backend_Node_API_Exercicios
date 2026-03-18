import * as taskService from "./taskService.js";
import * as userService from "./userService.js";
import { db } from "../db.js";

/* Função para  */
export const getCommentsByTaskId = async (taskId) => {
  const [comments] = await db.query(
    "SELECT * FROM comentario WHERE id_tarefa = ?",
    [taskId],
  );
  return comments;
};

/* Função para  */
export const createComment = (taskId, data) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const user = userService.getUserById(Number(data.userId));
  if (!user) {
    throw new Error("User not found");
  }

  const comment = {
    id: id++,
    taskId: taskId,
    userId: data.userId,
    conteudo: data.conteudo.trim(),
    dataCriacao: new Date().toISOString(),
  };

  comments.push(comment);
  return comment;
};

/* Função para  */
export const deleteComment = (commentId) => {
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  comments = comments.filter((c) => c.id !== commentId);
  return comment;
};

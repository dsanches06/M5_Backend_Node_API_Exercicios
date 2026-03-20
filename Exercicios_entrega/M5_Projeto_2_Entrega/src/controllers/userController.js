import * as userService from "../services/userService.js";

/* Função para buscar usuários */
export const getUsers = (req, res) => {
  const { sort, search } = req.query;
  const users = userService.getAllUsers(search, sort);
  res.json(users);
};

/* Função para criar usuário */
export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name.length < 3) {
      return res.status(400).json({ error: "O nome deve ter no mínimo 3 caracteres" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: `Erro ao criar usuário: ${error.message}` });
  }
};

/* Função para atualizar usuário */
export const updateUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (name !== undefined && name.length < 3) {
      return res.status(400).json({ error: "O nome deve ter no mínimo 3 caracteres" });
    }

    if (email !== undefined && !email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const user = userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: `Erro ao atualizar usuário: ${error.message}` });
  }
};

/* Função para deletar usuário */
export const deleteUser = (req, res) => {
  try {
    userService.deleteUser(Number(req.params.id));
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ error: `Erro ao deletar usuário: ${error.message}` });
  }
};

/* Função para alternar status ativo/inativo do usuário */
export const toggleUserActive = (req, res) => {
  const user = userService.toggleUserActive(Number(req.params.id));
  res.json(user);
};

/* Função para buscar estatísticas dos usuários */
export const getStats = (req, res) => {
  const stats = userService.getUserStats();
  res.json(stats);
};

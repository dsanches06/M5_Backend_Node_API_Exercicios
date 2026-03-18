import * as userService from "../services/userService.js";
import * as notificationService from "../services/notificationService.js";

export const getUsers = async (req, res) => {
  try {
    const { sort, search } = req.query;
    const users = await userService.getAllUsers(search, sort);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name.length < 3) {
      return res.status(400).json({
        error: `O nome ${name} tem que ter 3 caracteres no minimo!`,
      });
    }

    if (!email || !email.includes("@")) {
      res.status(400).json({
        error: `O email ${email} é inválido!`,
      });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (name !== undefined && name.length < 3) {
    return res.status(400).json({
      error: `O nome ${name} tem que ter 3 caracteres no minimo!`,
    });
  }

  if (email !== undefined && !email.includes("@")) {
    return res.status(400).json({
      error: `O email ${email} é inválido!`,
    });
  }

  try {
    const result = await userService.updateUser(
      Number(req.params.id),
      req.body,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: `O utilizador com id ${Number(req.params.id)} é não foi encontrado`,
      });
    } else {
      res.json({ message: "Dados do utilizador atualizado com sucesso" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: `O utilizador com id ${Number(req.params.id)} é não foi encontrado`,
      });
    } else {
      res.json({ message: "Utilizador removido com sucesso" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const toggleUserActive = (req, res) => {
  const user = userService.toggleUserActive(Number(req.params.id), req.body);
  res.json(user);
};

export const getStats = (req, res) => {
  const stats = userService.getUserStats();
  res.json(stats);
};

export const getNotifications = (req, res) => {
  try {
    const userId = Number(req.params.id);
    const notifications = notificationService.getNotificationsByUserId(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

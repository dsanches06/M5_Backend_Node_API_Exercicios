import { db } from "../db.js";

/* Função para  */
export const getAllUsers = async (search, sort) => {
  let [users] = await db.query("SELECT * FROM utilizador");

  if (search) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort && (sort === "asc" || sort === "desc")) {
    users.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sort === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  return users;
};

/* Função para  */
export const createUser = async (data) => {
  const { name, email, phone, active } = data;
  const [result] = await db.query(
    "INSERT INTO utilizador (nome, email, telefone) VALUES (?,?,?)",
    [name, email, phone],
  );

  return {
    id: result.insertId,
    name,
    email,
    phone,
    active,
  };
};

/* Função para  */
export const updateUser = async (userId, data) => {
  const { name, email, phone } = data;
  const [result] = await db.query(
    "UPDATE utilizador SET nome=?, email=?, telefone=? WHERE id=?",
    [name, email, phone, userId],
  );
  return result;
};

/* Função para  */
export const toggleUserActive = async (userId, data) => {
  const [result] = await db.query("UPDATE utilizador SET activo=? WHERE id=?", [
    data.active,
    userId,
  ]);
  return result;
};

/* Função para  */
export const deleteUser = async (userId) => {
  const [result] = await db.query("DELETE utilizador WHERE id=?", [userId]);
  return result;
};

/* Função para  */
export const getUserById = async (userId) => {
  const [user] = await db.query("SELECT * utilizador WHERE id=?", [userId]);
  return user;
};

/* Função para  */
export const getUserStats = async () => {
  const users = await getAllUsers();
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.activo).length;
  const inactiveUsers = totalUsers - activeUsers;
  const activePercentage =
    totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;
  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    activePercentage: activePercentage.toFixed(2) + "%",
  };
};

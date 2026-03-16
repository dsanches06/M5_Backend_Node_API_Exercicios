let users = [];

export const getAllUsers = (search, sort) => {
  let result = [...users];

  if (search) {
    result = result.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort && (sort === "asc" || sort === "desc")) {
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sort === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  return result;
};

export const createUser = (data) => {

  if (data.name !== undefined) {
    if (data.name.length < 3) {
      return res.status(400).json({
        error: `O nome ${data.name} tem que ter 3 caracteres no minimo!`,
      });
    }
  } else {
    return res
      .status(400)
      .json({ error: `O nome ${data.name} não pode ser vazio!` });
  }

  if (data.email !== undefined) {
    if (!data.email.includes("@")) {
      return res
        .status(400)
        .json({ error: `O email ${data.email} é inválido!` });
    }
  } else {
    return res
      .status(400)
      .json({ error: `O email ${data.email} não pode ser vazio!` });
  }

  const user = {
    id: users.length + 1,
    name: data.name,
    email: data.email,
    active: true,
  };
  users.push(user);
  return user;
};

export const updateUser = (userId, data) => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.name = data.name ?? user.name;
  user.email = data.email ?? user.email;
  user.active = data.active ?? user.active;

  return user;
};

export const toggleUserActive = (userId) => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.active = !user.active;
  return user;
};

export const deleteUser = (userId) => {
  users = users.filter((u) => u.id !== userId);
};

export const getUserStats = () => {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.active).length;
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

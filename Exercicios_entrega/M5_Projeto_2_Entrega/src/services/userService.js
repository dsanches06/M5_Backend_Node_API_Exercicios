let users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    active: true,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
    active: true,
  },
];

/* Função para buscar todos os usuários */
export const getAllUsers = (search, sort) => {
  let result = [...users];

  if (search) {
    result = result.filter(
      (u) =>
        u.nome.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort && (sort === "asc" || sort === "desc")) {
    result.sort((a, b) => {
      const nameA = a.nome.toLowerCase();
      const nameB = b.nome.toLowerCase();

      if (sort === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  return result;
};

/* Função para criar usuário */
export const createUser = (data) => {
  const user = {
    nome: data.nome,
    email: data.email,
    phone: data.phone,
    ativo: true,
  };

  return user;
};

/* Função para atualizar usuário */
export const updateUser = (userId, data) => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.nome = data.name ?? user.name;
  user.email = data.email ?? user.email;
  user.activo = data.active ?? user.active;

  return user;
};

/* Função para alternar status ativo/inativo do usuário */
export const toggleUserActive = (userId) => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.active = !user.active;
  return user;
};

/* Função para deletar usuário */
export const deleteUser = (userId) => {
  users = users.filter((u) => u.id !== userId);
};

/* Função para buscar usuário por ID */
export const getUserById = (userId) => {
  return users.find((u) => u.id === userId);
};

/* Função para buscar estatísticas dos usuários */
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

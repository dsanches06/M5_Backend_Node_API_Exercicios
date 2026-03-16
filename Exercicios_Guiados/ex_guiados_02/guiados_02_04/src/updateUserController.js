export const updateUser = (req, res) => {
  const user = req.user;

  const { nome, email, ativo } = req.body;

  if (nome !== undefined) {
    user.nome = nome;
  }

  if (email !== undefined) {
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }
    user.email = email;
  }

  if (ativo !== undefined) {
    if (typeof ativo !== "boolean") {
      return res.status(400).json({ error: "ativo deve ser boolean" });
    }
    user.ativo = ativo;
  }

  res.json(user);
};
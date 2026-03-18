let tags = [
  { id: 1, nome: "urgente" },
  { id: 2, nome: "frontend" },
  { id: 3, nome: "backend" },
  { id: 4, nome: "bug" },
  { id: 5, nome: "melhoria" },
];
let id = 1;

/* Função para buscar todas as tags */
export const getAllTags = () => {
  return tags;
};

/* Função para criar tag */
export const createTag = (data) => {
  const tag = {
    id: id++,
    nome: data.nome.trim(),
  };
  tags.push(tag);
  return tag;
};

/* Função para buscar tag por ID */
export const getTagById = (tagId) => {
  return tags.find((t) => t.id === tagId);
};

/* Função para deletar tag */
export const deleteTag = (tagId) => {
  const tag = tags.find((t) => t.id === tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  tags = tags.filter((t) => t.id !== tagId);
  return tag;
};

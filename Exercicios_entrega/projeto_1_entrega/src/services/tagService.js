let tags = [];

export const getAllTags = () => {
  return [...tags];
};

export const createTag = (data) => {
  const tag = {
    id: tags.length > 0 ? Math.max(...tags.map(t => t.id)) + 1 : 1,
    nome: data.nome.trim(),
  };

  tags.push(tag);
  return tag;
};

export const getTagById = (tagId) => {
  return tags.find((t) => t.id === tagId);
};

export const deleteTag = (tagId) => {
  const tag = tags.find((t) => t.id === tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }
  
  tags = tags.filter((t) => t.id !== tagId);
  return tag;
};

export const getUniqueRecord = (list) => {
  if (!Array.isArray(list)) return [];

  const seen = new Set();
  const unique = [];

  list.forEach((item) => {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      unique.push(item);
    }
  });

  return unique;
};
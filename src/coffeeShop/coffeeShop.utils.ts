export const processCategories = (categories) => {
  const matched = String(categories).match(/#[^\s#]+/g);
  return matched.map((category) => ({
    where: { slug: category },
    create: { name: category, slug: category },
  }));
};

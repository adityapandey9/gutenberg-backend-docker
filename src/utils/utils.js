export const escapeLike = (value) => {
  return value.replace(/[%_\\]/g, (match) => `\\${match}`);
}

export const buildPageUrl = (baseUrl, originalQuery, page, totalPages) => {
  if (page < 1 || page > totalPages) return null;

  const query = new URLSearchParams(originalQuery);

  query.set("page", page); // overwrite or add page param

  return `${baseUrl}?${query.toString()}`;
}

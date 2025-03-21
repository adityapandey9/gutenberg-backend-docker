import { getFilteredBooks } from "../services/booksService.js";

export async function fetchBooks(req, res) {
  try {
    const {
      ids,
      languages,
      mime_type,
      topic,
      search,
      page,
    } = req.query;

    const result = await getFilteredBooks({
      bookIds: ids?.split(","),
      languages: languages?.split(","),
      mimeTypes: mime_type?.split(","),
      topics: topic?.split(","),
      search: search?.split(","),
      page: parseInt(page),
      originalQuery: req.query,
    });

    res.json(result);
  } catch (err) {
    console.error("Fetch books error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

import { Router } from "express";
import { fetchBooks } from "../controllers/booksController.js";

const router = Router();

router.get("/", fetchBooks);

export default router;

import { db } from "../db/index.js";
import {
  booksBook,
  booksBookshelf,
  booksAuthor,
  booksSubject,
  booksLanguage,
  booksFormat,
} from "../db/drizzle/schema";
import { and, ilike, inArray, or, sql } from "drizzle-orm";
import { API_ROUTE } from "../config/const.js";
import { escapeLike, buildPageUrl } from "../utils/utils.js";

export async function getFilteredBooks({
  bookIds,
  languages,
  mimeTypes,
  topics,
  search,
  page,
  originalQuery,
}) {
  if (Number.isInteger(page) && page < 1) {
    return { detail: "Invalid page." };
  }

  if (!Number.isInteger(page)) {
    page = 1;
  }

  let limit = 25;
  const offset = (page - 1) * limit;

  // Initial book query
  let whereClauses = [];

  if (bookIds?.length) {
    whereClauses.push(inArray(booksBook.gutenbergId, bookIds.map(Number)));
  }

  if (search?.length) {
    const titleAuthorConditions = search.flatMap((t) => [
      ilike(booksBook.title, `%${escapeLike(t)}%`),
      sql`
        EXISTS (
          SELECT 1 FROM books_author
          JOIN books_book_authors ON books_author.id = books_book_authors.author_id
          WHERE books_book_authors.book_id = books_book.id
          AND ${ilike(booksAuthor.name, `%${escapeLike(t)}%`)}
        )
      `,
    ]);

    whereClauses.push(or(...titleAuthorConditions));
  }

  if (languages?.length) {
    whereClauses.push(sql`
      EXISTS (
        SELECT 1 FROM books_book_languages
        JOIN books_language ON books_language.id = books_book_languages.language_id
        WHERE books_book_languages.book_id = books_book.id
        AND ${inArray(booksLanguage.code, languages)}
      )
    `);
  }

  if (mimeTypes?.length) {
    const mimeConditions = mimeTypes.map((mt) =>
      ilike(booksFormat.mimeType, `%${escapeLike(mt)}%`)
    );

    whereClauses.push(sql`
      EXISTS (
        SELECT 1 FROM books_format
        WHERE books_format.book_id = books_book.id
        AND ${or(...mimeConditions)}
      )
    `);
  }

  if (topics?.length) {
    const subjectMatches = topics.map((t) =>
      ilike(booksSubject.name, `%${escapeLike(t)}%`)
    );
    const bookshelfMatches = topics.map((t) =>
      ilike(booksBookshelf.name, `%${escapeLike(t)}%`)
    );

    whereClauses.push(sql`
      (
        EXISTS (
          SELECT 1 FROM books_subject
          JOIN books_book_subjects ON books_subject.id = books_book_subjects.subject_id
          WHERE books_book_subjects.book_id = books_book.id
          AND ${or(...subjectMatches)}
        )
        OR
        EXISTS (
          SELECT 1 FROM books_bookshelf
          JOIN books_book_bookshelves ON books_bookshelf.id = books_book_bookshelves.bookshelf_id
          WHERE books_book_bookshelves.book_id = books_book.id
          AND ${or(...bookshelfMatches)}
        )
      )
    `);
  }

  const books = await db
    .select({
      id: booksBook.id,
      title: booksBook.title,
      gutenbergId: booksBook.gutenbergId,
      genre: sql`ARRAY(
        SELECT name FROM books_bookshelf
        JOIN books_book_bookshelves ON books_bookshelf.id = books_book_bookshelves.bookshelf_id
        WHERE books_book_bookshelves.book_id = books_book.id
      )`,
      authors: sql`ARRAY(
        SELECT name FROM books_author
        JOIN books_book_authors ON books_author.id = books_book_authors.author_id
        WHERE books_book_authors.book_id = books_book.id
      )`,
      languages: sql`ARRAY(
        SELECT code FROM books_language
        JOIN books_book_languages ON books_language.id = books_book_languages.language_id
        WHERE books_book_languages.book_id = books_book.id
      )`,
      subjects: sql`ARRAY(
        SELECT name FROM books_subject
        JOIN books_book_subjects ON books_subject.id = books_book_subjects.subject_id
        WHERE books_book_subjects.book_id = books_book.id
      )`,
      bookshelves: sql`ARRAY(
        SELECT name FROM books_bookshelf
        JOIN books_book_bookshelves ON books_bookshelf.id = books_book_bookshelves.bookshelf_id
        WHERE books_book_bookshelves.book_id = books_book.id
      )`,
      formats: sql`ARRAY(
        SELECT json_build_object('mimeType', mime_type, 'url', url)
        FROM books_format WHERE books_format.book_id = books_book.id
      )`,
    })
    .from(booksBook)
    .where(and(...whereClauses))
    .orderBy(sql`${booksBook.downloadCount} DESC`)
    .limit(limit)
    .offset(offset);

  const countRes = await db
    .select({ count: sql`count(*)::int` })
    .from(booksBook)
    .where(and(...whereClauses));

  const total = countRes[0]?.count ?? 0;

  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && page > 1) {
    return { detail: "Invalid page." };
  }

  return {
    count: total,
    next: buildPageUrl(API_ROUTE, originalQuery, page + 1, totalPages),
    previous: buildPageUrl(API_ROUTE, originalQuery, page - 1, totalPages),
    results: books,
  };
}

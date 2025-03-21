import { pgTable, index, unique, serial, varchar, check, integer, foreignKey, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const booksBookshelf = pgTable("books_bookshelf", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 64 }).notNull(),
}, (table) => [
	index("books_bookshelf_name_2642cad6_like").using("btree", table.name.asc().nullsLast().op("varchar_pattern_ops")),
	unique("books_bookshelf_name_key").on(table.name),
]);

export const booksBook = pgTable("books_book", {
	id: serial().primaryKey().notNull(),
	downloadCount: integer("download_count"),
	gutenbergId: integer("gutenberg_id").notNull(),
	mediaType: varchar("media_type", { length: 16 }).notNull(),
	title: varchar({ length: 1024 }),
}, (table) => [
	unique("books_book_gutenberg_id_key").on(table.gutenbergId),
	check("books_book_download_count_check", sql`download_count >= 0`),
	check("books_book_gutenberg_id_check", sql`gutenberg_id >= 0`),
]);

export const booksBookBookshelves = pgTable("books_book_bookshelves", {
	id: serial().primaryKey().notNull(),
	bookId: integer("book_id").notNull(),
	bookshelfId: integer("bookshelf_id").notNull(),
}, (table) => [
	index("books_book_bookshelves_0a4572cc").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	index("books_book_bookshelves_40928700").using("btree", table.bookshelfId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bookshelfId],
			foreignColumns: [booksBookshelf.id],
			name: "books_book_bookshel_bookshelf_id_80cc77c5_fk_books_bookshelf_id"
		}),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [booksBook.id],
			name: "books_book_bookshelves_book_id_f820ff72_fk_books_book_id"
		}),
	unique("books_book_bookshelves_book_id_6016a70a_uniq").on(table.bookId, table.bookshelfId),
]);

export const booksBookLanguages = pgTable("books_book_languages", {
	id: serial().primaryKey().notNull(),
	bookId: integer("book_id").notNull(),
	languageId: integer("language_id").notNull(),
}, (table) => [
	index("books_book_languages_0a4572cc").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	index("books_book_languages_468679bd").using("btree", table.languageId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [booksBook.id],
			name: "books_book_languages_book_id_e833b1f4_fk_books_book_id"
		}),
	foreignKey({
			columns: [table.languageId],
			foreignColumns: [booksLanguage.id],
			name: "books_book_languages_language_id_e9f60572_fk_books_language_id"
		}),
	unique("books_book_languages_book_id_554fdccb_uniq").on(table.bookId, table.languageId),
]);

export const booksLanguage = pgTable("books_language", {
	id: serial().primaryKey().notNull(),
	code: varchar({ length: 4 }).notNull(),
}, (table) => [
	index("books_language_code_217c406c_like").using("btree", table.code.asc().nullsLast().op("varchar_pattern_ops")),
	unique("books_language_code_key").on(table.code),
]);

export const booksBookSubjects = pgTable("books_book_subjects", {
	id: serial().primaryKey().notNull(),
	bookId: integer("book_id").notNull(),
	subjectId: integer("subject_id").notNull(),
}, (table) => [
	index("books_book_subjects_0a4572cc").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	index("books_book_subjects_ffaba1d1").using("btree", table.subjectId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [booksBook.id],
			name: "books_book_subjects_book_id_a578cff2_fk_books_book_id"
		}),
	foreignKey({
			columns: [table.subjectId],
			foreignColumns: [booksSubject.id],
			name: "books_book_subjects_subject_id_7445958f_fk_books_subject_id"
		}),
	unique("books_book_subjects_book_id_74dcf64a_uniq").on(table.bookId, table.subjectId),
]);

export const booksSubject = pgTable("books_subject", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 256 }).notNull(),
});

export const booksFormat = pgTable("books_format", {
	id: serial().primaryKey().notNull(),
	mimeType: varchar("mime_type", { length: 32 }).notNull(),
	url: varchar({ length: 256 }).notNull(),
	bookId: integer("book_id").notNull(),
}, (table) => [
	index("books_format_0a4572cc").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [booksBook.id],
			name: "books_format_book_id_b948fa34_fk_books_book_id"
		}),
]);

export const booksAuthor = pgTable("books_author", {
	id: serial().primaryKey().notNull(),
	birthYear: smallint("birth_year"),
	deathYear: smallint("death_year"),
	name: varchar({ length: 128 }).notNull(),
});

export const booksBookAuthors = pgTable("books_book_authors", {
	id: serial().primaryKey().notNull(),
	bookId: integer("book_id").notNull(),
	authorId: integer("author_id").notNull(),
}, (table) => [
	index("books_book_authors_0a4572cc").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	index("books_book_authors_4f331e2f").using("btree", table.authorId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [booksAuthor.id],
			name: "books_book_authors_author_id_984f1ab8_fk_books_author_id"
		}),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [booksBook.id],
			name: "books_book_authors_book_id_ed3433e7_fk_books_book_id"
		}),
	unique("books_book_authors_book_id_8714badb_uniq").on(table.bookId, table.authorId),
]);

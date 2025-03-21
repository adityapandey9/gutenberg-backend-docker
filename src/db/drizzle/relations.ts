import { relations } from "drizzle-orm/relations";
import { booksBookshelf, booksBookBookshelves, booksBook, booksBookLanguages, booksLanguage, booksBookSubjects, booksSubject, booksFormat, booksAuthor, booksBookAuthors } from "./schema";

export const booksBookBookshelvesRelations = relations(booksBookBookshelves, ({one}) => ({
	booksBookshelf: one(booksBookshelf, {
		fields: [booksBookBookshelves.bookshelfId],
		references: [booksBookshelf.id]
	}),
	booksBook: one(booksBook, {
		fields: [booksBookBookshelves.bookId],
		references: [booksBook.id]
	}),
}));

export const booksBookshelfRelations = relations(booksBookshelf, ({many}) => ({
	booksBookBookshelves: many(booksBookBookshelves),
}));

export const booksBookRelations = relations(booksBook, ({many}) => ({
	booksBookBookshelves: many(booksBookBookshelves),
	booksBookLanguages: many(booksBookLanguages),
	booksBookSubjects: many(booksBookSubjects),
	booksFormats: many(booksFormat),
	booksBookAuthors: many(booksBookAuthors),
}));

export const booksBookLanguagesRelations = relations(booksBookLanguages, ({one}) => ({
	booksBook: one(booksBook, {
		fields: [booksBookLanguages.bookId],
		references: [booksBook.id]
	}),
	booksLanguage: one(booksLanguage, {
		fields: [booksBookLanguages.languageId],
		references: [booksLanguage.id]
	}),
}));

export const booksLanguageRelations = relations(booksLanguage, ({many}) => ({
	booksBookLanguages: many(booksBookLanguages),
}));

export const booksBookSubjectsRelations = relations(booksBookSubjects, ({one}) => ({
	booksBook: one(booksBook, {
		fields: [booksBookSubjects.bookId],
		references: [booksBook.id]
	}),
	booksSubject: one(booksSubject, {
		fields: [booksBookSubjects.subjectId],
		references: [booksSubject.id]
	}),
}));

export const booksSubjectRelations = relations(booksSubject, ({many}) => ({
	booksBookSubjects: many(booksBookSubjects),
}));

export const booksFormatRelations = relations(booksFormat, ({one}) => ({
	booksBook: one(booksBook, {
		fields: [booksFormat.bookId],
		references: [booksBook.id]
	}),
}));

export const booksBookAuthorsRelations = relations(booksBookAuthors, ({one}) => ({
	booksAuthor: one(booksAuthor, {
		fields: [booksBookAuthors.authorId],
		references: [booksAuthor.id]
	}),
	booksBook: one(booksBook, {
		fields: [booksBookAuthors.bookId],
		references: [booksBook.id]
	}),
}));

export const booksAuthorRelations = relations(booksAuthor, ({many}) => ({
	booksBookAuthors: many(booksBookAuthors),
}));
-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "books_bookshelf" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	CONSTRAINT "books_bookshelf_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "books_book" (
	"id" serial PRIMARY KEY NOT NULL,
	"download_count" integer,
	"gutenberg_id" integer NOT NULL,
	"media_type" varchar(16) NOT NULL,
	"title" varchar(1024),
	CONSTRAINT "books_book_gutenberg_id_key" UNIQUE("gutenberg_id"),
	CONSTRAINT "books_book_download_count_check" CHECK (download_count >= 0),
	CONSTRAINT "books_book_gutenberg_id_check" CHECK (gutenberg_id >= 0)
);
--> statement-breakpoint
CREATE TABLE "books_book_bookshelves" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"bookshelf_id" integer NOT NULL,
	CONSTRAINT "books_book_bookshelves_book_id_6016a70a_uniq" UNIQUE("book_id","bookshelf_id")
);
--> statement-breakpoint
CREATE TABLE "books_book_languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"language_id" integer NOT NULL,
	CONSTRAINT "books_book_languages_book_id_554fdccb_uniq" UNIQUE("book_id","language_id")
);
--> statement-breakpoint
CREATE TABLE "books_language" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(4) NOT NULL,
	CONSTRAINT "books_language_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "books_book_subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	CONSTRAINT "books_book_subjects_book_id_74dcf64a_uniq" UNIQUE("book_id","subject_id")
);
--> statement-breakpoint
CREATE TABLE "books_subject" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books_format" (
	"id" serial PRIMARY KEY NOT NULL,
	"mime_type" varchar(32) NOT NULL,
	"url" varchar(256) NOT NULL,
	"book_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books_author" (
	"id" serial PRIMARY KEY NOT NULL,
	"birth_year" smallint,
	"death_year" smallint,
	"name" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books_book_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	CONSTRAINT "books_book_authors_book_id_8714badb_uniq" UNIQUE("book_id","author_id")
);
--> statement-breakpoint
ALTER TABLE "books_book_bookshelves" ADD CONSTRAINT "books_book_bookshel_bookshelf_id_80cc77c5_fk_books_bookshelf_id" FOREIGN KEY ("bookshelf_id") REFERENCES "public"."books_bookshelf"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_bookshelves" ADD CONSTRAINT "books_book_bookshelves_book_id_f820ff72_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "public"."books_book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_languages" ADD CONSTRAINT "books_book_languages_book_id_e833b1f4_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "public"."books_book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_languages" ADD CONSTRAINT "books_book_languages_language_id_e9f60572_fk_books_language_id" FOREIGN KEY ("language_id") REFERENCES "public"."books_language"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_subjects" ADD CONSTRAINT "books_book_subjects_book_id_a578cff2_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "public"."books_book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_subjects" ADD CONSTRAINT "books_book_subjects_subject_id_7445958f_fk_books_subject_id" FOREIGN KEY ("subject_id") REFERENCES "public"."books_subject"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_format" ADD CONSTRAINT "books_format_book_id_b948fa34_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "public"."books_book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_authors" ADD CONSTRAINT "books_book_authors_author_id_984f1ab8_fk_books_author_id" FOREIGN KEY ("author_id") REFERENCES "public"."books_author"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_book_authors" ADD CONSTRAINT "books_book_authors_book_id_ed3433e7_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "public"."books_book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "books_bookshelf_name_2642cad6_like" ON "books_bookshelf" USING btree ("name" varchar_pattern_ops);--> statement-breakpoint
CREATE INDEX "books_book_bookshelves_0a4572cc" ON "books_book_bookshelves" USING btree ("book_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_bookshelves_40928700" ON "books_book_bookshelves" USING btree ("bookshelf_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_languages_0a4572cc" ON "books_book_languages" USING btree ("book_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_languages_468679bd" ON "books_book_languages" USING btree ("language_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_language_code_217c406c_like" ON "books_language" USING btree ("code" varchar_pattern_ops);--> statement-breakpoint
CREATE INDEX "books_book_subjects_0a4572cc" ON "books_book_subjects" USING btree ("book_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_subjects_ffaba1d1" ON "books_book_subjects" USING btree ("subject_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_format_0a4572cc" ON "books_format" USING btree ("book_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_authors_0a4572cc" ON "books_book_authors" USING btree ("book_id" int4_ops);--> statement-breakpoint
CREATE INDEX "books_book_authors_4f331e2f" ON "books_book_authors" USING btree ("author_id" int4_ops);
*/
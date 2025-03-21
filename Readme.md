Here’s a clean and professional `README.md` for your **Gutenberg Books API** project, tailored to the stack and structure you’ve set up:

---

### 📄 `README.md`

```markdown
# 📚 Gutenberg Books API

An Express.js + Bun-powered REST API to retrieve and filter books from the [Project Gutenberg](https://www.gutenberg.org/) dataset, using PostgreSQL and Drizzle ORM.  
Includes full Docker support, Swagger docs, CI/CD via GitHub Actions, and clean dev/prod environment separation.

---

## 🚀 Features

- 🔎 Powerful filters (language, title, author, topic, mime-type, ID)
- 🧠 Case-insensitive partial matches on all string filters
- 📄 Paginated responses with `next` and `previous` page links
- 📥 Returns download links, subjects, bookshelves, and more
- 🌍 Swagger docs served at `/docs`
- 🐳 Docker-ready & CI/CD pipeline with versioned Docker Hub image
- 🌱 Uses Drizzle ORM for type-safe DB queries
- ⚙️ Environment-separated configs (`.env.production`, `.env.development`)

---

## 📦 Tech Stack

- [Bun](https://bun.sh/) — JavaScript runtime
- [Express](https://expressjs.com/) — API Framework
- [PostgreSQL](https://www.postgresql.org/) — Relational Database
- [Supabase](https://supabase.com/) — Managed Postgres Service
- [Drizzle ORM](https://orm.drizzle.team/) — SQL-aware TypeScript ORM
- [Docker](https://www.docker.com/) — Containerization
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- [Swagger UI](https://swagger.io/tools/swagger-ui/) — API Documentation

---

## 📂 Project Structure
```

src/
├── app.js # Entry point
├── db/ # Drizzle schema & DB config
├── routes/ # Express routes
├── controllers/ # Route logic
├── services/ # DB querying logic
├── swagger/ # swagger.yaml OpenAPI spec

````

---

## 🧪 Local Development

### 1. Install Dependencies
```bash
bun install
````

### 2. Start Dev Server

```bash
bun run dev
```

> Make sure to copy `.env.example` → `.env.development` and fill in your values.

---

## 📖 API Docs

Once the server is running:

```
http://localhost:3000/docs
```

OpenAPI-powered Swagger UI.

---

## ⚙️ Environment Setup

- `.env.development` – for local dev
- `.env.production` – for Docker/CI/CD
- You can override or pass individual env variables directly.

See `.env.example` for the required values.

---

## 🐳 Docker

### Build Image Locally

```bash
docker build -t gutenberg-api .
```

### Run with Env File

```bash
docker run -p 3000:3000 --env-file .env.production gutenberg-api
```

---

## 🚀 Deployment via GitHub Actions

- Push to `deploy` branch → builds and pushes Docker image
- Tags pushed to Docker Hub:
  - `latest`
  - `vX.Y.Z` from `package.json`

Secrets Required in GitHub:

- `DOCKER_HUB_USERNAME`
- `DOCKER_HUB_ACCESS_TOKEN`

---

## 🧪 Example Queries

```http
GET /books?languages=en&search=dickens&page=1
GET /books?topic=history,romance&mime_type=application/epub+zip
GET /books?ids=1342,84&languages=en
```

---

## 🧰 Scripts

```bash
bun run dev        # Start with nodemon
bun run start      # Start for prod
bun run generate:drizzle  # Generate schema from Supabase
```

---

## 🧠 Branch Strategy

| Branch   | Purpose                                          |
| -------- | ------------------------------------------------ |
| `dev`    | Active development                               |
| `main`   | Stable release-ready code                        |
| `deploy` | Triggers Docker image build + push to Docker Hub |

---

## 🤝 License

MIT

---

## ✨ Author

Made with ❤️ by Aditya Kumar Pandey

```

---

Let me know if you want this saved as a file, or want a matching `.env.example` next!
```

# Copilot Coding Standards and Instructions

## General Guidelines

- **Language Policy**: All code comments, function/variable descriptions, and documentation must be in **English**. User-facing messages, prompts, and UI text must be in **Russian** (managed via `lib/i18n.ts`).
- **No Summary Files**: Do not create files dedicated to describing completed work (e.g., `change.md` or similar).

## Project Architecture

### Monorepo Structure
- **Root** (`/`) contains workspace config; **main app** lives in `weboff-webapp/`
- **Database file**: `weboff-webapp/data/weboff.db` (SQLite3)
- **Path aliases**: `@/*` resolves to `weboff-webapp/*` (configured in `tsconfig.json`)

### Next.js 15 + React 19 Patterns
- **Server Components by default** (no directive = server). Use `"use client"` only when needed (state, effects, browser APIs).
- **Data access split**:
  - **Server Components / API Routes**: Import `getProjectsRepository()` from `@/lib/db` for direct database access
  - **Client Components**: Use functions from `@/lib/api-client.ts` to call `/api/*` endpoints
- **Example**: `app/page.tsx` uses `"use client"` because it needs state/effects; `app/portfolio/page.tsx` would be server-rendered.

### Database Layer (SQLite3 + better-sqlite3)
- **Connection**: Singleton pattern in `lib/db/connection.ts` (`getDatabase()` returns shared instance)
- **Schema**: Table definitions in `lib/db/schema.ts` with `initializeSchema()` and `dropSchema()`
- **Repositories**: `lib/db/repositories/projects.ts` exports `ProjectsRepository` class
  - All queries use **prepared statements** (`.prepare()`) to prevent SQL injection
  - CRUD methods: `getAllActive()`, `getById()`, `create()`, `update()`, `delete()`, `deactivate()`, `activate()`, `search()`
- **Entry Point**: `lib/db/index.ts` exports `getProjectsRepository()` factory function
- **Data model**: `types/index.ts` defines `Project` interface (TypeScript types separate from DB schema)

### API Architecture
- **REST Endpoints**: `app/api/{resource}/route.ts` files export HTTP handler functions (GET, POST, PATCH, DELETE)
- **Response Format**: All endpoints return `{ success: boolean, data?: T, error?: string, message?: string, count?: number }`
- **Client SDK**: `lib/api-client.ts` wraps fetch calls with proper typing (`fetchProjects`, `createProject`, `updateProject`, `deleteProject`, `searchProjects`)
- **Available Endpoints**:
  - `GET /api/projects?all=true` (optional query param for inactive projects)
  - `POST /api/projects`, `GET|PATCH|DELETE /api/projects/[id]`
  - `GET /api/search?q=query`, `GET /api/stats`, `GET /api/health`

### Internationalization (i18n)
- **Translations**: `lib/i18n.ts` exports `i18n` object with `en` and `de` keys
- **Provider**: `components/LanguageProvider.tsx` wraps app in context; `useLanguage()` hook returns `{ lang, setLang, mounted }`
- **Usage**: Import `i18n` and `useLanguage` in client components; access via `i18n[lang].section.key`
- **State**: Language preference stored in `localStorage`, auto-detected from `navigator.language` on first visit

## Development Workflows

### Database Commands
```bash
npm run db:migrate   # Initialize schema + seed data (idempotent)
npm run db:test      # Quick DB connection test
npm run db:reset     # DROP all tables + recreate (destructive!)
```
- **Migration Script**: `lib/migrate.ts` creates tables and seeds initial projects
- **Safe to re-run**: `db:migrate` checks if data exists before inserting

### Development Server
```bash
npm run dev          # Starts Next.js dev server with Turbopack
npm run build        # Production build with Turbopack
npm run start        # Serve production build
npm run lint         # Run ESLint
```
- Dev server runs at `http://localhost:3000`
- API available at `http://localhost:3000/api/*`

### Adding New Features

#### New Database Table
1. Update `lib/db/schema.ts` with table definition in `initializeSchema()`
2. Create repository class in `lib/db/repositories/[name].ts` (follow `projects.ts` pattern)
3. Export factory function from `lib/db/index.ts`
4. Define TypeScript types in `types/index.ts`

#### New API Endpoint
1. Create `app/api/[name]/route.ts` with exported HTTP methods
2. Return standard response format: `{ success, data?, error? }`
3. Add client functions to `lib/api-client.ts` with proper typing
4. Update `API.md` / `API_QUICKSTART.md` documentation

#### New Component
- Place in `components/` directory
- Client components: Add `"use client"` directive
- Use `useLanguage()` for i18n, access `i18n[lang]` for translations
- Export from `components/index.ts` for clean imports

## Project-Specific Conventions

### Prepared Statements (Security)
- **Always** use parameterized queries: `db.prepare(sql).run(...params)`
- **Never** interpolate user input into SQL strings
- See `lib/db/repositories/projects.ts` for examples

### TypeScript Patterns
- Strict mode enabled (`tsconfig.json`)
- Use `Omit<Project, 'id'>` for create operations
- Use `Partial<Omit<Project, 'id'>>` for update operations
- Repository return types: `Project | null` for single, `Project[]` for multiple

### Styling (Tailwind CSS 4)
- Utility-first classes, use `@tailwindcss/postcss` (v4 syntax)
- Custom font: Inter via Google Fonts (`--font-inter` CSS variable)
- Dark mode not currently configured

### Animation
- Framer Motion (`framer-motion`) for animations
- See existing components for patterns

## File Organization Rules

- **API Routes**: `app/api/{resource}/route.ts` (no nested logic files)
- **Components**: Flat in `components/`, examples in `components/examples/`
- **Database**: All DB code in `lib/db/` module (connection, schema, repositories, index)
- **Types**: Central `types/index.ts` for shared interfaces
- **Scripts**: Standalone executable scripts in `lib/*.ts` (migrate, reset-db, test-db)

## Quality Standards

- **Error Handling**: Wrap database/API operations in try-catch, return descriptive errors
- **Validation**: Check required fields in POST/PATCH endpoints, return 400 with clear messages
- **Logging**: Use `console.log/error` for server-side logging (visible in dev server)
- **Documentation**: Keep `API.md`, `README.md`, and doc comments in sync with code changes

## Additional Guidance

- **Turbopack**: Build tool enabled by default (`--turbopack` flag in scripts)
- **ESLint**: Configured with Next.js rules (`eslint-config-next`)
- **Dependencies**: Minimal set—avoid adding libraries without discussion
- **Workspace**: This is a monorepo; app code lives in `weboff-webapp/` subdirectory

# CLAUDE.md — GreenTech Demo Application

## Project Overview

**GreenTech** is a full-stack web application for managing green initiatives in schools, combining a React/Vite frontend with a Spring Boot backend.

- **Frontend**: `demo-frontend/` — React 19 + TypeScript + Vite
- **Backend**: `demo-backend/` — Spring Boot 4.0.5 + JPA + MySQL
- **Type**: Monorepo with independent frontend and backend projects
- **Primary Purpose**: Educational web application showcasing a registration form and proposal submission system

For full technical details, see [Technical_Documentation.md](./Technical_Documentation.md) and [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md).

---

## Quick Start

### Prerequisites
- **Frontend**: Node.js 18+, pnpm (or npm)
- **Backend**: JDK 17, Maven (wrapper `mvnw`/`mvnw.cmd` included)
- **Database**: MySQL with a database named `demo_db`

### Running Locally

**Backend:**
```bash
cd demo-backend
mvnw.cmd spring-boot:run          # Windows
# OR
./mvnw spring-boot:run             # Unix/Mac
```
Runs on `http://localhost:8080`

**Frontend:**
```bash
cd demo-frontend
pnpm install && pnpm run dev       # Recommended
# OR
npm install && npm run dev
```
Runs on `http://localhost:5173`

---

## Architecture

### Frontend (`demo-frontend/`)

**Key Files:**
- `src/App.tsx` — Main entry; assembles all UI sections and defines API endpoints, navigation, and form fields
- `src/components/` — Reusable modular components (Header, Hero, RegistrationForm, ProposalList, etc.), each with colocated `.tsx` and `.css`
- `vite.config.ts` — Build and dev server config
- `eslint.config.js` — Linting rules
- `package.json` — Scripts: `dev`, `build`, `lint`, `preview`

**Build & Check:**
```bash
pnpm run dev      # Start dev server with HMR
pnpm run build    # TypeScript check + Vite build
pnpm run lint     # ESLint check
```

**Key Patterns:**
- Each component is a directory with `.tsx` and `.css` colocated
- Strings and configuration defined at the top of `App.tsx` for easy customization
- API calls happen in components (e.g., `RegistrationForm`, `ProposalList`)
- CORS enabled on backend for `http://localhost:5173`

### Backend (`demo-backend/`)

**Key Files:**
- `src/main/java/it/demo/app/DemoBackendApplication.java` — Spring Boot entry point
- `src/main/java/it/demo/app/controllers/ItemController.java` — REST API endpoints (`GET /api/items`, `POST /api/items`)
- `src/main/java/it/demo/app/services/ItemService.java` — Business logic
- `src/main/java/it/demo/app/persistence/entities/Item.java` — JPA entity mapped to `items` table
- `src/main/java/it/demo/app/config/WebConfig.java` — CORS configuration
- `src/main/resources/application.properties` — Database and server config
- `pom.xml` — Maven dependencies and build config

**Build & Check:**
```bash
mvnw.cmd spring-boot:run    # Start dev server (Windows)
./mvnw spring-boot:run      # Start dev server (Unix)
mvnw.cmd test               # Run tests
mvnw.cmd package            # Build JAR
```

**Architecture Pattern:**
- **Controller** → **Service** → **Repository** → **JPA Entity**
- DTOs separate REST payloads from persistence models
- `hibernate.ddl-auto=update` during development (auto-migrate schema)

---

## API Contract

### Endpoints

| Method | Path | Request | Response |
|--------|------|---------|----------|
| `GET` | `/api/items` | — | Array of `{id, title, body, email?, createdAt?}` |
| `POST` | `/api/items` | `{title, body, email}` | `{id, title, body, email, createdAt}` |

### Example Requests

**POST (frontend form submission):**
```json
{
  "title": "Titolo progetto",
  "body": "Descrizione del progetto",
  "email": "contatto@esempio.com"
}
```

**GET response:**
```json
[
  {
    "id": 1,
    "title": "Titolo progetto",
    "body": "Descrizione",
    "email": "contatto@esempio.com",
    "createdAt": "2026-05-28T10:30:00Z"
  }
]
```

---

## Important Implementation Details

### Frontend (App.tsx Customization Points)

Key variables at the top of `App.tsx` control the entire UI:
- `BACKEND_URL` — API endpoint (default: `http://localhost:8080/api/items`)
- `NAV_LINKS` — Header navigation labels
- `CAROUSEL_SLIDES` — Carousel content
- `FEATURE_CARDS` — Feature highlights
- `STATS` — KPI counters
- `TESTIMONIALS` — Testimonial blocks
- `FORM_FIELDS` — Form structure; `name` must match backend payload fields
- `FOOTER_COLUMNS` — Footer sections

**To adapt to a different backend:**
1. Update `BACKEND_URL` in `App.tsx:39`
2. Verify `FORM_FIELDS` names align with backend `ItemController` payload expectations
3. Update `ProposalList` props: `titleField`, `textField`, `metaField` if API response field names differ

### Backend Database

**Tables:**
- `items` — Stores proposals with `id`, `title`, `body`, `email`, `created_at`, `updated_at`

**Setup:**
```sql
CREATE DATABASE demo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Spring will auto-create the table on first run (if `hibernate.ddl-auto=update`).

---

## Development Conventions

1. **Component Organization**: Each UI component in `demo-frontend/src/components/` lives in its own directory with a `.tsx` file and a `.css` file.
2. **API Calls**: Fetch/POST calls happen in React components directly (no separate API client layer yet).
3. **Styling**: Component-scoped CSS files; no global CSS framework (plain CSS per component).
4. **TypeScript**: Strict type checking enabled in `tsconfig.app.json`.
5. **ESLint**: Enforced for frontend; check with `pnpm run lint` before committing.
6. **Java Style**: Standard Spring Boot conventions (packages under `it.demo.app.*`, entity/controller/service layering).

---

## Common Tasks

### Add a New API Endpoint

1. **Backend:**
   - Add method to `ItemController` with `@GetMapping` or `@PostMapping`
   - Add business logic to `ItemService` if needed
   - Add `@CrossOrigin` if CORS is required

2. **Frontend:**
   - Update `BACKEND_URL` or add a new constant
   - Call the endpoint in the appropriate component (e.g., `RegistrationForm`, `ProposalList`)

### Update Form Fields

1. **Backend:** Ensure `ItemController` payload matches the field names in `FORM_FIELDS`
2. **Frontend:** Update `FORM_FIELDS` array in `App.tsx` to match the backend and UI needs

### Deploy Backend

```bash
cd demo-backend
mvnw.cmd package
java -jar target/demo-backend-0.0.1-SNAPSHOT.jar --spring.datasource.url=jdbc:mysql://prod-host:3306/demo_db --spring.datasource.username=user --spring.datasource.password=pass
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors in browser console | Verify backend `WebConfig` includes frontend origin in `addAllowedOriginPatterns` |
| Frontend can't connect to backend | Check `BACKEND_URL` in `App.tsx` matches running backend URL |
| Database connection fails | Ensure MySQL is running, database exists, and credentials in `application.properties` are correct |
| TypeScript build errors | Run `pnpm run build` to see full type-checking output |
| Port already in use | Backend (8080), Frontend (5173); use `lsof -i :PORT` (Unix) or `netstat -an` (Windows) to find culprits |

---

## Files to Modify for Customization

| Goal | Files |
|------|-------|
| Change UI text, hero image, carousel | `demo-frontend/src/App.tsx` (top configuration) |
| Update form fields or API contract | `demo-frontend/src/App.tsx` + `demo-backend/.../ItemController.java` |
| Add new API endpoint | `demo-backend/src/main/java/it/demo/app/controllers/ItemController.java` |
| Modify database schema | `demo-backend/src/main/java/it/demo/app/persistence/entities/Item.java` |
| Change CORS settings | `demo-backend/src/main/java/it/demo/app/config/WebConfig.java` |
| Styling tweaks | Component `.css` files in `demo-frontend/src/components/` |

---

## Next Steps for New Contributors

1. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for a quick orientation
2. Start both servers (`pnpm run dev` in frontend, `mvnw spring-boot:run` in backend)
3. Open `http://localhost:5173` in your browser and test the full flow
4. Study the component structure in `demo-frontend/src/components/` for style and pattern
5. Refer to [Technical_Documentation.md](./Technical_Documentation.md) for detailed architecture and endpoint examples

# ALLEGATO TECNICO E RELAZIONE DI PROGETTO
## Applicazione Web GreenTech — Gestione Iniziative Green nelle Scuole

**Data**: 28 maggio 2026  
**Versione**: 1.0  
**Autore**: Diego Cipolla  
**Progetto**: GreenTech Demo Application

---

## 1. Flusso di Navigazione Previsto

### Percorso Utente Principale (User Journey)

L'applicazione segue un flusso lineare e intuitivo:

1. **Accesso Iniziale**
   - L'utente accede a `http://localhost:5173` e visualizza la pagina home
   - Header fisso con navigazione principale verso sezioni: Home, Missione, Tecnologie, Premi, Proposte

2. **Esplorazione Contenuti**
   - Visualizzazione Hero section con call-to-action principale
   - Consultazione carousel con slide tematiche
   - Lettura feature cards che illustrano la missione del progetto
   - Visualizzazione contatori statistici (scuole, studenti, progetti)
   - Lettura testimonianze di istituzioni partecipanti
   - Consultazione galleria immagini progetti realizzati

3. **Compilazione Modulo di Registrazione**
   - L'utente clicca "Registrati" o "Invia proposta"
   - Scroll verso sezione `#registrazione`
   - Compilazione campi obbligatori: Nome progetto, Descrizione, Email
   - Submit della proposta via HTTP POST al backend

4. **Feedback Utente**
   - Messaggio di successo: "Proposta inviata con successo!"
   - Refresh automatico della lista proposte sottostante

5. **Visualizzazione Elenco Proposte**
   - Sezione "Proposte Pervenute" mostra lista progetti inviati
   - Recupero dati da backend via GET `/api/items`
   - Presentazione card con titolo, descrizione e metadati
   - Messaggio "Nessuna proposta ancora..." se lista vuota

### Percorsi di Navigazione Specifici

```
Home
├─ Sezione Hero
│  └─ CTA → Scroll a #registrazione
├─ Carousel (Tecnologie)
├─ Feature Cards (Missione)
├─ Stats Counter (Premi)
├─ Testimonials
├─ Image Gallery
├─ Call To Action
├─ Registration Form (#registrazione)
│  └─ POST /api/items
└─ Proposal List (#proposte)
   └─ GET /api/items
```

---

## 2. Struttura delle Pagine e Organizzazione

### Architettura Page Layout

L'applicazione segue un **layout single-page** (SPA) con sezioni verticali:

```
┌─────────────────────────────────┐
│      HEADER (navigazione)       │ Fixed/Sticky
├─────────────────────────────────┤
│  HERO SECTION                   │
│  (titolo, immagine, CTA)       │
├─────────────────────────────────┤
│  CAROUSEL                       │
│  (slide tematiche autoplay)     │
├─────────────────────────────────┤
│  FEATURE CARDS                  │
│  (card con icone e testi)       │
├─────────────────────────────────┤
│  STATS COUNTER                  │
│  (contatori animati)             │
├─────────────────────────────────┤
│  TESTIMONIALS                   │
│  (card testimonianze)           │
├─────────────────────────────────┤
│  CALL TO ACTION                 │
│  (sez. conversione)              │
├─────────────────────────────────┤
│  REGISTRATION FORM              │
│  (form con validazione)         │
├─────────────────────────────────┤
│  PROPOSAL LIST                  │
│  (elenco proposte inviate)      │
├─────────────────────────────────┤
│  IMAGE GALLERY                  │
│  (griglia immagini)              │
├─────────────────────────────────┤
│  FOOTER                         │
│  (navigazione, contatti, links) │
└─────────────────────────────────┘
```

### Organizzazione File nel Progetto

**Frontend** (`demo-frontend/`):
```
src/
├── App.tsx                          # Entry point, assembla tutti i componenti
├── main.tsx                         # Bootstrap React
├── index.css                        # Stile globale
├── App.css                          # CSS app-level
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.css
│   ├── Carousel/
│   │   ├── Carousel.tsx
│   │   └── Carousel.css
│   ├── FeatureCards/
│   │   ├── FeatureCards.tsx
│   │   └── FeatureCards.css
│   ├── StatsCounter/
│   │   ├── StatsCounter.tsx
│   │   └── StatsCounter.css
│   ├── Testimonials/
│   │   ├── Testimonials.tsx
│   │   └── Testimonials.css
│   ├── CallToAction/
│   │   ├── CallToAction.tsx
│   │   └── CallToAction.css
│   ├── RegistrationForm/
│   │   ├── RegistrationForm.tsx
│   │   └── RegistrationForm.css
│   ├── ProposalList/
│   │   ├── ProposalList.tsx
│   │   └── ProposalList.css
│   ├── ImageGallery/
│   │   ├── ImageGallery.tsx
│   │   └── ImageGallery.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   └── index.ts                     # Barrel export
├── assets/
│   ├── hero.png
│   ├── download.png
│   ├── react.svg
│   └── vite.svg
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── package.json
└── index.html
```

**Backend** (`demo-backend/`):
```
src/main/java/it/demo/app/
├── DemoBackendApplication.java      # Spring Boot entry point
├── controllers/
│   └── ItemController.java          # REST endpoints
├── services/
│   └── ItemService.java             # Business logic
├── persistence/
│   ├── entities/
│   │   └── Item.java                # JPA entity
│   └── repositories/
│       └── ItemRepository.java       # Data access layer
├── config/
│   └── WebConfig.java               # CORS, Web config
src/main/resources/
├── application.properties            # Configuration
src/test/java/
└── it/demo/app/
    └── DemoBackendApplicationTests.java
pom.xml                              # Maven config
mvnw / mvnw.cmd                      # Maven wrapper
```

---

## 3. Componenti dell'Interfaccia Utente

Tutti i componenti seguono il pattern **component-colocated styling** (`.tsx` e `.css` insieme).

### Elenco Componenti

| Componente | Responsabilità | Props Principali |
|-----------|-----------------|------------------|
| **Header** | Navigazione, brand, CTA | `brand`, `links`, `ctaText`, `ctaHref` |
| **Hero** | Sezione intro con immagine e CTA | `imageSrc`, `title`, `subtitle`, `ctaText` |
| **Carousel** | Slide autoplay tematiche | `slides`, `autoplay`, `interval` |
| **FeatureCards** | Card feature con icone | `heading`, `cards`, `subheading` |
| **StatsCounter** | Contatori animati KPI | `stats` |
| **Testimonials** | Card testimonianze con rating | `heading`, `items` |
| **RegistrationForm** | Form raccolta proposte | `apiUrl`, `fields`, `submitText`, `successMessage` |
| **ProposalList** | Lista proposte ricevute | `apiUrl`, `titleField`, `textField`, `emptyMessage` |
| **ImageGallery** | Griglia immagini | `heading`, `images` |
| **CallToAction** | Sezione conversione | `title`, `text`, `buttonText`, `buttonHref` |
| **Footer** | Links, contatti, copyright | `brand`, `columns`, `socials`, `bottomLinks` |

### Flusso Dati nei Componenti

```
App.tsx
├─ Definisce costanti (BACKEND_URL, NAV_LINKS, CAROUSEL_SLIDES, etc.)
├─ Passa props ai componenti presentazionali
│
├─ RegistrationForm
│  ├─ Raccoglie input utente (title, body, email)
│  ├─ Valida form
│  └─ Effettua POST /api/items
│     └─ Mostra successo/errore
│
├─ ProposalList
│  ├─ Effettua GET /api/items al mount
│  ├─ Mappa risposta JSON
│  └─ Renderizza card con dati ricevuti
│
└─ Componenti presentazionali
   └─ Renderizzano UI senza logica complessa
```

---

## 4. Tecnologie Utilizzate

### Frontend Stack

| Tecnologia | Versione | Utilizzo |
|-----------|----------|---------|
| **React** | 19.2.4 | Framework UI, composizione componenti |
| **TypeScript** | ~6.0.2 | Type safety, sviluppo robusto |
| **Vite** | 8.0.4 | Build tool, dev server con HMR |
| **Node.js** | 18+ | Runtime, package manager |
| **pnpm** | latest | Package manager (alternativa npm) |
| **ESLint** | 9.39.4 | Code linting |
| **@vitejs/plugin-react** | 6.0.1 | Plugin React per Vite |

**Build Commands:**
```bash
pnpm run dev      # Start dev server (localhost:5173)
pnpm run build    # TypeScript check + Vite build
pnpm run lint     # ESLint check
pnpm run preview  # Preview build localmente
```

### Backend Stack

| Tecnologia | Versione | Utilizzo |
|-----------|----------|---------|
| **Java** | 17 | Linguaggio backend |
| **Spring Boot** | 4.0.5 | Framework web |
| **Spring WebMVC** | 6.x | REST API handling |
| **Spring Data JPA** | 3.x | ORM, persistenza |
| **Hibernate** | 6.x | JPA provider |
| **MySQL Connector/J** | 8.x | Driver database |
| **Lombok** | 1.18.x | Riduzione boilerplate |
| **Maven** | 3.6+ | Build automation |

**Build Commands:**
```bash
mvnw.cmd spring-boot:run  # Start dev server (Windows)
./mvnw spring-boot:run    # Start dev server (Unix)
mvnw.cmd test             # Run tests
mvnw.cmd package          # Build JAR
```

---

## 5. Architettura Prevista Client/Server

### Architettura General Overview

```
┌─────────────────────────────────────────────┐
│         CLIENT (Browser - React SPA)         │
│                                              │
│  Header → Hero → Carousel → FeatureCards    │
│  → StatsCounter → Testimonials → CTA        │
│  → RegistrationForm → ProposalList → Footer │
│                                              │
│  HTTP Requests:                              │
│  - POST /api/items (form submission)        │
│  - GET /api/items (load proposals)          │
└────────────────────┬────────────────────────┘
                     │ HTTP/JSON
                     ↓
┌─────────────────────────────────────────────┐
│    SERVER (Spring Boot REST API)             │
│    http://localhost:8080                     │
│                                              │
│  ItemController                              │
│  ├─ GET /api/items → ItemService            │
│  └─ POST /api/items → ItemService           │
│         ↓                                    │
│  ItemService (business logic)               │
│         ↓                                    │
│  ItemRepository (JpaRepository)             │
│         ↓                                    │
│  Item Entity (JPA mapping)                  │
└────────────────────┬────────────────────────┘
                     │ SQL
                     ↓
┌─────────────────────────────────────────────┐
│    DATABASE (MySQL)                          │
│    demo_db.items table                       │
│                                              │
│  Columns:                                    │
│  - id (PK, auto-increment)                  │
│  - title (VARCHAR 255)                      │
│  - body (TEXT)                              │
│  - email (VARCHAR 255)                      │
│  - created_at (TIMESTAMP)                   │
│  - updated_at (TIMESTAMP)                   │
└─────────────────────────────────────────────┘
```

### Layered Architecture (Backend)

```
API Layer
  ↓ @RestController, @RequestMapping
ItemController
  ├─ GET /api/items → getAll()
  └─ POST /api/items → create(ItemDTO)
  
  ↓ Dependency Injection
  
Service Layer
  ↓ @Service, business logic
ItemService
  ├─ getAllItems()
  └─ saveItem(ItemDTO)
  
  ↓ Delegation
  
Persistence Layer
  ↓ @Repository, extends JpaRepository
ItemRepository
  ├─ findAll()
  └─ save(Entity)
  
  ↓ ORM Mapping (Hibernate)
  
Entity Layer
  ↓ @Entity, @Table
Item
  ├─ id: Long
  ├─ title: String
  ├─ body: String
  ├─ email: String
  └─ createdAt: LocalDateTime
```

### Flusso Richiesta-Risposta

**POST /api/items (Creazione Proposta):**

```
1. Client (RegistrationForm)
   └─ POST http://localhost:8080/api/items
      Content-Type: application/json
      Body: {"title": "...", "body": "...", "email": "..."}

2. Server (ItemController)
   └─ @PostMapping("/items")
      validate CORS → extract ItemDTO → call ItemService

3. ItemService
   └─ saveItem(ItemDTO)
      create Item entity → set timestamps → call repository.save()

4. ItemRepository
   └─ save(Item)
      Hibernate → SQL INSERT → MySQL table items

5. Response
   └─ 200 OK
      {"id": 1, "title": "...", "body": "...", "email": "...", "createdAt": "..."}

6. Client
   └─ Show success message
      Refresh proposal list via GET
```

**GET /api/items (Caricamento Proposte):**

```
1. Client (ProposalList, useEffect)
   └─ GET http://localhost:8080/api/items

2. Server (ItemController)
   └─ @GetMapping("/items")
      call ItemService.getAllItems()

3. ItemService
   └─ return repository.findAll()

4. ItemRepository
   └─ findAll()
      Hibernate → SQL SELECT * FROM items → MySQL

5. Response
   └─ 200 OK
      [
        {"id": 1, "title": "...", ...},
        {"id": 2, "title": "...", ...}
      ]

6. Client
   └─ Set state with proposals
      Re-render ProposalList with data
```

### CORS Configuration

Backend espone CORS per frontend dev locale:

```java
// WebConfig.java
@CrossOrigin(origins = {
    "http://localhost:5173",    // Frontend Vite
    "http://localhost:3000"     // Alternative React dev
})
```

---

## 6. Scelte Grafiche, Accessibilità e Responsive Design

### Scelte Grafiche

**Palette Colori:**
- Verde (#2D5016) — Tema principale, sostenibilità
- Grigio (#F5F5F5) — Sfondo, sezioni
- Nero (#1a1a1a) — Testo principale
- Blu (#007ACC) — Link, CTA secondari

**Tipografia:**
- Font body: System font stack (sans-serif)
- Dimensioni: 16px base, scale 1.25 (mobile-first)
- Weights: 400 (regular), 600 (semi-bold), 700 (bold)

**Componenti Visivi:**
- Card con `box-shadow` leggera (ombra soft)
- Border-radius: 8px (rounded corners moderati)
- Spacing: Grid 8px (multiples di 8 per consistency)
- Icone emoji inline (🌱 missione, ⚡ energia, 🏆 premi)

### Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Approccio:**
- Mobile-first CSS (base mobile, media queries per desktop)
- Flexbox/Grid per layout fluido
- Font-size scalabile (vw units per hero, em/rem per body)
- Images: max-width 100%, height auto

**Esempio Media Query (FeatureCards):**
```css
.cards {
  display: grid;
  grid-template-columns: 1fr;        /* Mobile: 1 colonna */
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: 1fr 1fr;  /* Tablet: 2 colonne */
  }
}

@media (min-width: 1024px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr;  /* Desktop: 3 colonne */
  }
}
```

### Accessibilità

**Standard WCAG 2.1 Level A:**

1. **Semantic HTML:**
   - `<header>`, `<main>`, `<section>`, `<footer>` per struttura
   - `<button>` per azioni, `<a>` per navigazione
   - `<form>`, `<label>`, `<input>` con associazione

2. **ARIA Labels:**
   ```jsx
   <button aria-label="Invia modulo">Invia</button>
   <div role="status" aria-live="polite">{message}</div>
   ```

3. **Contrasto:**
   - Testo: rapporto minimo 4.5:1 (nero su bianco)
   - Links: colore distinto + underline

4. **Tastiera:**
   - Tutti gli elementi interattivi: tab-focusable
   - Focus visible: outline colorato (2px)
   - Form: tasti freccia/Tab per navigazione

5. **Immagini:**
   ```jsx
   <img src="hero.png" alt="Laboratorio green scolastico" />
   ```

6. **Form Validation:**
   ```jsx
   <input required aria-required="true" aria-invalid={hasError} />
   {error && <div role="alert">{error}</div>}
   ```

**Testing Accessibilità:**
- Strumenti: axe DevTools, Lighthouse (Chrome), NVDA screen reader
- Checklist: tabbing, form labels, color contrast, semantic markup

---

## 7. Descrizione delle Attività Svolte

### Fase 1: Setup Progetto (Completata)

**Frontend:**
- ✅ Inizializzazione React 19 + Vite + TypeScript
- ✅ Configurazione ESLint e linting rules
- ✅ Setup tsconfig.app.json (strict mode)
- ✅ Creazione struttura cartelle componenti

**Backend:**
- ✅ Creazione Spring Boot 4.0.5 project
- ✅ Configurazione Maven pom.xml
- ✅ Setup database MySQL (application.properties)
- ✅ Configurazione CORS in WebConfig

### Fase 2: Sviluppo Componenti Frontend (Completata)

**Componenti Implementati:**
- ✅ Header (logo, nav links, CTA button)
- ✅ Hero (immagine, titolo, subtitle, CTA)
- ✅ Carousel (slide autoplay, controlli)
- ✅ FeatureCards (3-column grid, icone, testi)
- ✅ StatsCounter (contatori animati KPI)
- ✅ Testimonials (card testimonianze + rating)
- ✅ RegistrationForm (validazione, POST API)
- ✅ ProposalList (fetch, map, render)
- ✅ ImageGallery (griglia responsive)
- ✅ CallToAction (sezione conversione)
- ✅ Footer (nav, contatti, socials, copyright)

**Styling:**
- ✅ CSS component-scoped per ogni elemento
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Consistenza colori e tipografia

### Fase 3: Sviluppo Backend (Completata)

**Endpoint Implementati:**
- ✅ `GET /api/items` — Recupera lista proposte
- ✅ `POST /api/items` — Crea nuova proposta

**Entità e Repository:**
- ✅ Item.java (mapping tabella items)
- ✅ ItemRepository.java (JpaRepository)
- ✅ ItemService.java (business logic)
- ✅ ItemController.java (REST endpoints)

**Configurazione:**
- ✅ CORS abilitato per localhost:5173
- ✅ Database auto-migration (Hibernate DDL)
- ✅ Timestamps automatici (createdAt, updatedAt)

### Fase 4: Integrazione Frontend-Backend (Completata)

- ✅ Configurazione BACKEND_URL in App.tsx
- ✅ Allineamento FORM_FIELDS con ItemController payload
- ✅ POST form submission (RegistrationForm)
- ✅ GET list loading (ProposalList)
- ✅ Gestione errori e messaggi di successo

### Fase 5: Documentazione (Completata)

- ✅ Technical_Documentation.md (dettagli architettura)
- ✅ PROJECT_CONTEXT.md (quick reference)
- ✅ CLAUDE.md (agent customization)
- ✅ RELAZIONE_TECNICA.md (questo file)

---

## 8. Istruzioni per Avviare l'Applicazione

### Prerequisiti

```
✓ Node.js 18+ (verificare: node --version)
✓ pnpm o npm (raccomandato pnpm)
✓ JDK 17 (verificare: java -version)
✓ MySQL Server in running (default: localhost:3306)
✓ Git (opzionale, per versionamento)
```

### Setup Database

**1. Creare database MySQL:**

```sql
CREATE DATABASE demo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Opzione 2: Via CLI MySQL:**
```bash
mysql -u root -p
> CREATE DATABASE demo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> EXIT;
```

**Verifica:**
```bash
mysql -u root -p demo_db -e "SHOW TABLES;"
```

### Avvio Backend

**Windows:**
```bash
cd demo-backend
mvnw.cmd spring-boot:run
```

**Unix/Mac:**
```bash
cd demo-backend
./mvnw spring-boot:run
```

**Attesa output:**
```
...
Tomcat started on port(s): 8080 (http)
Started DemoBackendApplication in X.XXX seconds
```

**Verifica:**
```bash
curl http://localhost:8080/api/items
# Atteso: [] (array vuoto)
```

### Avvio Frontend

**Terminal nuovo:**
```bash
cd demo-frontend
pnpm install  # Esecuzione una sola volta
pnpm run dev
```

**Attesa output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

**Accesso browser:**
Aprire `http://localhost:5173`

### Comandi Utili (durante sviluppo)

**Frontend:**
```bash
pnpm run dev      # Dev server con HMR
pnpm run build    # Build produzione (TypeScript check + Vite)
pnpm run lint     # ESLint check
pnpm run preview  # Preview build localmente
```

**Backend:**
```bash
mvnw.cmd test             # Run unit tests
mvnw.cmd package          # Build JAR
mvnw.cmd spring-boot:run  # Start server
```

### Test Full Stack

1. **Aprire frontend:** http://localhost:5173
2. **Compilare form:** Nome progetto, Descrizione, Email
3. **Submit:** Cliccare "Invia proposta"
4. **Atteso:** Messaggio di successo
5. **Verifica lista:** Scorrere a "Proposte Pervenute" → vedere proposta appena inviata
6. **Verifica backend:** `curl http://localhost:8080/api/items`

### Troubleshooting Avvio

| Problema | Soluzione |
|----------|-----------|
| `Port 8080 already in use` | `netstat -an \| find ":8080"` (Windows) o `lsof -i :8080` (Unix), killare processo |
| `Port 5173 already in use` | Cambiare porta in `vite.config.ts` o killare processo |
| `MySQL connection error` | Verificare MySQL running: `mysql -u root -p`, verificare credenziali in `application.properties` |
| `Database demo_db not found` | Eseguire `CREATE DATABASE demo_db` |
| `CORS error in browser` | Verificare backend URL in `App.tsx:39` e CORS in `WebConfig.java` |
| `TypeScript build error` | Eseguire `pnpm run build` per vedere dettagli, verificare tsconfig.app.json |

---

## 9. Indicazioni per Testare i Servizi

### Test Endpoint API

#### 9.1 GET /api/items (Recupera tutte le proposte)

**cURL:**
```bash
curl -X GET http://localhost:8080/api/items \
  -H "Content-Type: application/json"
```

**Risposta Attesa (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Orto Scolastico Sostenibile",
    "body": "Implementazione di un orto biologico nella scuola...",
    "email": "contatto@scuola.it",
    "createdAt": "2026-05-28T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Pannelli Solari Classe",
    "body": "Installazione pannelli solari educativi...",
    "email": "preside@istituto.it",
    "createdAt": "2026-05-28T11:15:00Z"
  }
]
```

#### 9.2 POST /api/items (Crea nuova proposta)

**cURL:**
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Progetto Test",
    "body": "Descrizione del progetto test",
    "email": "test@example.com"
  }'
```

**Risposta Attesa (200 OK):**
```json
{
  "id": 3,
  "title": "Progetto Test",
  "body": "Descrizione del progetto test",
  "email": "test@example.com",
  "createdAt": "2026-05-28T12:00:00Z"
}
```

**Codici Errore Possibili:**
- `400 Bad Request` — Payload JSON mancante/invalido
- `500 Internal Server Error` — Errore database

### Test da Browser (Frontend)

**Scenario 1: Form Submission**
1. Navigare a http://localhost:5173
2. Scorrere a "Registra la tua scuola"
3. Compilare:
   - Nome progetto: "Test Green Initiative"
   - Descrizione: "Facciamo una iniziativa sostenibile"
   - Email: "test@greentech.it"
4. Cliccare "Invia proposta"
5. **Atteso:** 
   - Messaggio "Proposta inviata con successo!"
   - Form reset
   - Proposta appare in "Proposte Pervenute"

**Scenario 2: List Refresh**
1. Aprire DevTools (F12)
2. Andare a sezione "Proposte Pervenute"
3. Verificare Network tab: request GET /api/items
4. Controllare risposta JSON
5. **Atteso:** Lista proposte renderizzata correttamente

**Scenario 3: Responsive Design**
1. DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Testare breakpoints:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
3. **Atteso:** Layout responsive, no scroll orizzontale

### Test Automatici (Opzionale)

**Backend Test Unit:**
```bash
cd demo-backend
mvnw.cmd test
```

**Comandi Testare Performance:**
```bash
# Frontend build size
cd demo-frontend
pnpm run build
# Controllare dist/ size

# Backend build
cd demo-backend
mvnw.cmd package
# Controllare target/demo-backend-0.0.1-SNAPSHOT.jar size
```

### Checklist Testing

- [ ] Backend avviato su port 8080
- [ ] Frontend avviato su port 5173
- [ ] Database MySQL connesso
- [ ] GET /api/items risponde con 200 OK
- [ ] POST /api/items crea proposta
- [ ] Form frontend invia dati correttamente
- [ ] Proposta appare in lista
- [ ] ProposalList carica da GET
- [ ] Layout responsive (mobile, tablet, desktop)
- [ ] Nessun errore CORS in console
- [ ] Nessun errore TypeScript in build
- [ ] Nessun errore ESLint in lint

---

## Conclusione

Questa relazione tecnica fornisce una panoramica completa dell'architettura, della struttura e dell'implementazione dell'applicazione GreenTech. Il sistema segue best practices frontend (React + TypeScript + Vite) e backend (Spring Boot + JPA), con un'architettura a layer pulita e una comunicazione REST efficiente.

Per domande o chiarimenti su aspetti specifici, consultare:
- **Technical_Documentation.md** per dettagli architetturali completi
- **PROJECT_CONTEXT.md** per quick reference e convenzioni
- **CLAUDE.md** per guida sviluppatori e AI agents
- **Code comments** nei file sorgente per logica complessa

**Data Compilazione:** 28 maggio 2026  
**Status:** Completa e pronta per deployment

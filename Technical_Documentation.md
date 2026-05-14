# Documento Tecnico — Applicazione Web (Frontend + Backend)

**Versione**: 1.0  
**Progetto**: demo-frontend / demo-backend

---

## Sommario

- Introduzione
- Flusso di Navigazione (User Journey)
- Struttura delle Pagine e Organizzazione
- Componenti UI
- Tecnologie Utilizzate
- Architettura Client/Server
- Scelte Grafiche, Accessibilità e Responsive
- Attività di Sviluppo, Problemi e Soluzioni
- Istruzioni per Avvio Locale
- Testing dei Servizi (endpoint ed esempi)
- Appendice: Riferimenti ai file chiave

---

## Introduzione

**Scopo**: Fornire una descrizione tecnica completa e operativa dell’applicazione web presente nel repository, comprendente frontend React/Vite e backend Spring Boot.

**Ambito**: Architettura, componenti UI, flusso utente, istruzioni di avvio e testing degli endpoint REST.

---

## Flusso di Navigazione (User Journey)

- Visitatore → Home: accesso iniziale alla pagina principale (Hero, Call To Action, Feature Cards).
- Navigazione principale: header con link alle sezioni (Gallery, Proposals, Registration).
- Azione principale (CTA): l’utente clicca un Call to Action che può aprire una pagina o un form.
- Compilazione form: invio dati al backend via POST su `api/items`; alla risposta positiva viene mostrata conferma.
- Visualizzazione elenchi: le liste (ProposalList, ImageGallery) vengono popolate via GET da `api/items`.

### Percorsi principali

1. Browse contenuti → dettaglio o modulo
2. Compilazione form → submit → creazione risorsa
3. Refresh/listing → fetch GET da `api/items`

---

## Struttura delle Pagine e Organizzazione

### Layout generale
- `Header` (navigazione)
- `Main content` (Hero, sezioni modulari)
- `Footer` (contatti, link)

### Pagine/Sezioni principali
- Home (aggregazione componenti)
- Gallery / Proposals (liste di contenuti)
- Registrazione / Form (form di invio dati)

### Organizzazione nel progetto
- Frontend: cartella `src/components` contiene componenti modulari (es. `CallToAction`, `Hero`, `RegistrationForm`).
- Backend: API REST sotto il prefisso `/api` (controller `ItemController`).

---

## Componenti UI

- Ogni componente è organizzato in una directory con file `.tsx` e `.css` associati.
- Componenti principali:
  - `Header`: navigazione e brand.
  - `Hero`: sezione introduttiva.
  - `CallToAction`: pulsante o area per conversione.
  - `Carousel`, `ImageGallery`: visualizzazione media.
  - `FeatureCards`, `ProposalList`: elenchi e card.
  - `RegistrationForm`: form di invio dati.
  - `Footer`: informazioni secondarie.

### Librerie e strumenti UI
- React 19 per il rendering.
- Styling: CSS per componente (file `.css` accanto ai `.tsx`).
- Vite come bundler/ dev server con plugin React.

### Pattern
- Separazione tra componenti presentazionali (stateless) e container (gestione stato/chiamate API).
- DTO JSON per comunicazione frontend-backend.

---

## Tecnologie Utilizzate

### Frontend
- Linguaggi: TypeScript, JSX/TSX
- Framework: React (v19)
- Tooling: Vite, TypeScript, ESLint
- File di riferimento: `demo-frontend/package.json`, `demo-frontend/vite.config.ts`

### Backend
- Linguaggio: Java 17
- Framework: Spring Boot (4.x), Spring WebMVC, Spring Data JPA
- Librerie: Lombok, MySQL Connector/J
- Build: Maven (wrapper `mvnw`, `mvnw.cmd`)
- File di riferimento: `demo-backend/pom.xml`, `demo-backend/src/main/resources/application.properties`

---

## Architettura Client/Server

### Pattern architetturale
- Layered Architecture:
  - Controller (API REST) — `it.demo.app.controllers`
  - Service (business logic) — `it.demo.app.services`
  - Repository / Persistence (JPA entities & repositories) — `it.demo.app.persistence`

### Flusso dei dati (testuale)
Browser (React) → HTTP(S) → Spring Boot (`/api/items`) → Service → Repository → MySQL

### Note infrastrutturali
- CORS abilitato per `http://localhost:5173` e `http://localhost:3000` (vedi `ItemController`).
- Persistenza: JPA con `hibernate.ddl-auto=update` (solo sviluppo).

---

## Scelte Grafiche, Accessibilità e Responsive

### Scelte grafiche
- Layout modulare (Hero, Feature Cards, CTA). Consistenza tramite variabili CSS raccomandate.

### Responsive
- CSS per componente con breakpoints e layout fluidi. Approccio mobile-first consigliato.

### Accessibilità (raccomandazioni)
- Usare markup semantico (`header`, `main`, `footer`, `form`, `label`).
- Fornire `aria-*` ove necessario.
- Verificare contrasto e focus state. Strumenti: axe, Lighthouse.

---

## Attività di Sviluppo, Problemi e Soluzioni

### Fasi di sviluppo
1. Setup frontend (Vite + React + TypeScript)
2. Setup backend (Spring Boot + JPA)
3. Implementazione API REST (controller → service → repository)
4. Integrazione frontend-backend
5. Styling e test responsive
6. Build e packaging

### Problemi riscontrati e soluzioni
- CORS: risolto con `@CrossOrigin` su controller.
- Mapping entità/DTO: uso di DTO nel controller per separare modello DB dal payload.
- Configurazioni DB: proprietà esterne e override runtime.

---

## Istruzioni per Avvio Locale

### Prerequisiti
- JDK 17
- Maven (o usare wrapper `mvnw` / `mvnw.cmd`)
- Node >= 18 e pnpm/npm
- MySQL (o DB compatibile)

### Backend (demo-backend)
1. Creare database MySQL (esempio):

```sql
CREATE DATABASE demo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Configurare credenziali in `demo-backend/src/main/resources/application.properties` se necessario.

3. Avviare in sviluppo:

- Windows:

```powershell
mvnw.cmd spring-boot:run
```

- Unix:

```bash
./mvnw spring-boot:run
```

4. Generare jar e avviare:

```bash
./mvnw package
java -jar target/demo-backend-0.0.1-SNAPSHOT.jar
```

5. Porta: `8080` (configurata in `application.properties`).

### Frontend (demo-frontend)
1. Installare dipendenze e avviare dev server (consigliato `pnpm`):

```bash
pnpm install
pnpm run dev
```

Oppure con npm:

```bash
npm install
npm run dev
```

2. Comandi utili:
- `dev` → avvio Vite (solitamente `http://localhost:5173`)
- `build` → produzione (`tsc -b && vite build`)
- `preview` → anteprima build

Nota: CORS backend include `http://localhost:5173`.

---

## Testing dei Servizi (Endpoint ed Esempi)

### Endpoint principali
- `GET http://localhost:8080/api/items` — restituisce lista di item.
- `POST http://localhost:8080/api/items` — crea un nuovo item.

### Esempio JSON di POST

```json
{
  "title": "Titolo esempio",
  "body": "Contenuto",
  "email": "user@example.com"
}
```

### Esempi `curl`

- GET:

```bash
curl -X GET http://localhost:8080/api/items
```

- POST:

```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"Prova","body":"Corpo","email":"e@e.com"}'
```

### Test con Postman / HTTP client
- Creare collection con i due endpoint; verificare header `Content-Type: application/json`.

### Test automatici
- Eseguire test backend (se presenti):

```bash
./mvnw test
```

---

## Appendice: Riferimenti ai file chiave

- Frontend:
  - `demo-frontend/package.json`
  - `demo-frontend/vite.config.ts`
  - `demo-frontend/src/components/CallToAction/CallToAction.tsx`

- Backend:
  - `demo-backend/pom.xml`
  - `demo-backend/src/main/resources/application.properties`
  - `demo-backend/src/main/java/it/demo/app/controllers/ItemController.java`

---

## Prossimi passi consigliati

- Validazione accessibilità (axe/Lighthouse) e correzione issues.
- Aggiungere test end-to-end (Cypress / Playwright) per i percorsi utente critici.
- Preparare script e istruzioni CI/CD per build e deploy.

---

*Documento generato automaticamente a partire dallo stato del repository.*

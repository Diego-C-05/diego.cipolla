# Project Context

Documento rapido per riaprire il repository senza doverlo riesplorare da zero.

## Scopo del progetto

Applicazione web composta da:
- frontend React + Vite + TypeScript in `demo-frontend`
- backend Spring Boot + JPA + MySQL in `demo-backend`

Il flusso principale è: React invia richieste HTTP al backend, il backend valida e mappa i dati, persiste su MySQL e restituisce DTO JSON al frontend.

## Struttura generale

- `demo-frontend/`: SPA React con componenti modulari e styling CSS per componente.
- `demo-backend/`: API REST con architettura a layer controller -> service -> repository -> entity.
- `Technical_Documentation.md`: documentazione estesa del progetto.

## Frontend

Entry point principali:
- `demo-frontend/src/main.tsx`
- `demo-frontend/src/App.tsx`
- `demo-frontend/src/components/index.ts`

Comportamento attuale:
- `App.tsx` assembla i componenti UI e punta al backend su `http://localhost:8080/api/items`.
- `RegistrationForm` fa `POST` verso il backend.
- `ProposalList` fa `GET` e mostra i dati ricevuti.
- `Header`, `Hero`, `Carousel`, `FeatureCards`, `StatsCounter`, `Testimonials`, `ImageGallery`, `CallToAction`, `Footer` sono componenti riusabili in `src/components/*`.

Stack e script:
- React 19
- Vite
- TypeScript
- ESLint
- script utili: `pnpm run dev`, `pnpm run build`, `pnpm run lint`, `pnpm run preview`

## Backend

Entry point principali:
- `demo-backend/src/main/java/it/demo/app/DemoBackendApplication.java`
- `demo-backend/src/main/java/it/demo/app/controllers/ItemController.java`
- `demo-backend/src/main/java/it/demo/app/services/ItemService.java`
- `demo-backend/src/main/java/it/demo/app/persistence/entities/Item.java`
- `demo-backend/src/main/java/it/demo/app/persistence/repositories/ItemRepository.java`
- `demo-backend/src/main/java/it/demo/app/config/WebConfig.java`

Flusso backend:
- `ItemController` espone `/api/items`.
- `ItemService` costruisce e salva l'entità `Item`.
- `ItemRepository` estende `JpaRepository<Item, Long>`.
- `Item` rappresenta la tabella `items` con `createdAt` valorizzato in `@PrePersist` se assente.
- `WebConfig` abilita CORS per `http://localhost:5173` e `http://localhost:3000`.

Config rilevante:
- `spring.application.name=demo-backend`
- MySQL su `jdbc:mysql://localhost:3306/demo_db`
- `server.port=8080`
- `spring.jpa.hibernate.ddl-auto=update`

Stack e build:
- Java 17
- Spring Boot 4.0.5
- Spring WebMVC
- Spring Data JPA
- Lombok
- MySQL Connector/J
- Maven wrapper: `mvnw` / `mvnw.cmd`

## Contratto API

Endpoint attuali:
- `GET /api/items` restituisce la lista degli item come DTO con `id`, `title`, `body`
- `POST /api/items` accetta `title`, `body`, `email` e restituisce `id`, `title`, `createdAt`

Payload POST atteso:

```json
{
  "title": "Titolo esempio",
  "body": "Contenuto",
  "email": "user@example.com"
}
```

## Setup locale

Backend:
- creare il database MySQL `demo_db`
- avviare con `demo-backend/mvnw.cmd spring-boot:run`
- test: `demo-backend/mvnw.cmd test`

Frontend:
- installare dipendenze in `demo-frontend`
- avviare con `pnpm run dev`

## Convenzioni utili

- I componenti frontend vivono in cartelle separate con `.tsx` e `.css` accanto.
- Il backend usa DTO nel controller per separare payload API da modello persistito.
- Le richieste frontend-backend si aspettano CORS già abilitato sul backend in locale.
- `application.properties` e `pom.xml` sono i due file da controllare per problemi di runtime/build lato backend.

## Punti delicati

- `demo-frontend/src/App.tsx` è il punto più rapido per capire cosa mostra davvero l'applicazione.
- `demo-backend/src/main/java/it/demo/app/controllers/ItemController.java` definisce il contratto che il frontend consuma.
- `demo-backend/src/main/java/it/demo/app/persistence/entities/Item.java` controlla il mapping DB e i campi salvati.
- `Technical_Documentation.md` contiene il dettaglio completo; questo file serve per orientamento rapido e manutenzione quotidiana.

## Quando aggiornarlo

Aggiornare questo file se cambiano:
- stack o versioni principali
- endpoint REST
- struttura frontend o backend
- configurazione DB/CORS/porta
- comandi di avvio o test
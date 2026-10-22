# DevToolkit

DevToolkit is an open-source platform providing essential utilities for developers in one searchable, fast, and secure interface.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Spring Boot 3 (Java 21)
- **Containerization**: Docker & Docker Compose
- **Testing**: JUnit 5, Mockito, Vitest, React Testing Library

## Prerequisites
- Node.js 22+
- Java 21+ & Maven 3.9+
- Docker & Docker Compose (for containerized execution)

## Running Locally

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API is accessible at `http://localhost:8080/api/v1`.
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend is accessible at `http://localhost:5173`.

## Running with Docker Compose
```bash
docker compose up --build -d
```
- Frontend: `http://localhost` (or specific port configured)
- Backend: `http://localhost:8080/api/v1`

## Roadmap
- Phase 1: Core setup, homepage, health check API, testing, and containerization.
- Phase 2: Implementation of 5 utility tools (JSON formatter, Base64 encoder, UUID generator, JWT decoder, SQL formatter).
- Phase 3+: More tools, authentication, and user preferences.

## License
MIT License. See [LICENSE](LICENSE) for details.
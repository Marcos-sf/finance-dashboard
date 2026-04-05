# Finance Dashboard Backend

This repository contains the backend implementation for the Finance Data Processing and Access Control system. Demonstrates clean architecture, strict typings, robust error handling, and logical RESTful endpoints.

##  Technology Stack
* **Language**: TypeScript / Node.js
* **Framework**: Express.js
* **Database**: SQLite (via Prisma ORM)
* **Validation**: Zod
* **Authentication**: JSON Web Tokens (JWT)
* **Testing**: Jest & Supertest
* **Containerization**: Docker

##  Features Implemented
1. **Role-Based Authentication (RBAC)**: Secure access using JWT (`Admin`, `Analyst`, `Viewer`).
2. **Financial Records Management**: Complete CRUD supporting conditional access limits based on user role.
3. **Advanced Querying**: Pagination, filtering (type, category, date limits) directly handled at the ORM level.
4. **Dashboard Summary Utilities**: Data aggregation directly mapped to API layers yielding real-time category spending.
5. **Security Layers**: Built-in rate limiting and HTTP header safeguards (Helmet), strictly validated payload inputs (Zod).

##  Architectural Trade-Offs & Future Scope (Production Readiness)
For the explicit scope of this assignment, several practical trade-offs were made prioritizing testability, clarity, and rapid setup logic:

* **Authentication Refresh Cycle Framework**: To keep API usage straightforward for the reviewer via Postman or Swagger, we rely on a single long-lived JWT. In a strict SaaS production system, we would implement an `HttpOnly` Access Token & Refresh Token pair to prevent session hijacking and abrupt logouts seamlessly.
* **Tenant Isolation**: Currently `GET /records` pulls and aggregates all values found globally in the database. In a true multi-tenant deployment, these filters would enforce strict underlying validation bound inherently by specific `userId` associations.
* **Secrets Management**: Configuration elements such as the `JWT_SECRET` remain visibly hardcoded in our `docker-compose.yml`. Going to production (e.g. AWS ECS or Kubernetes) implies orchestrating these via a robust KMS or secret manager injected strictly at deployment runtime.
* **Database Choice**: We utilized SQLite enabling pure self-containment. Scaling to large traffic would prompt migrating Prisma towards PostgreSQL.

##  Getting Started

### Option 1: Docker (Recommended)
You can instantly start up the entire application mapped to port 3000 directly using Docker compose:
```bash
docker-compose up --build
```

### Option 2: Local Environment
Ensure you have `Node.js` installed perfectly on your machine.
```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

##  API Documentation (Swagger)
Once the server is running, you can explore, view, and interact with the endpoints entirely via the visual Swagger UI interface simply by opening your browser to:
`http://localhost:3000/api-docs`

##  Testing Setup
The backend utilizes Jest for End-To-End API testing simulating direct requests. Crucially, the tests operate dynamically on a strictly isolated SQLite dummy file (`test.db`) rather than wiping out your local development dataset.
Run the test suite directly:
```bash
npm run test
```

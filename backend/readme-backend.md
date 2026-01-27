# Group Project Accountability Tracker – Backend

This repository contains the backend implementation for the **Group Project Accountability Tracker (GPA Tracker)**.  
The backend is designed using a **microservice-oriented architecture**, focusing on clean separation of concerns, scalability, and long-term maintainability.

---

## 🧠 Project Philosophy

The core idea of this system is **accountability** in group projects:
- Clear ownership
- Explicit responsibilities
- Verifiable task assignment
- Minimal assumptions, strict data contracts

Versioning is intentional. Only essential services are built first to avoid premature complexity.

---

## 🏗 Backend Architecture Overview

Each service is isolated, independently deployable, and communicates via HTTP APIs.


All services use:
- **Node.js + TypeScript**
- **Express**
- **PostgreSQL**
- **JWT-based authentication**

backend/
├── services/
│   ├── auth-service/
│   ├── project-service/
│   ├── task-service/
│   ├── evidence-service/    (planned – v2)
│   ├── review-service/      (planned – v2)
│   ├── scoring-service/     (planned – v2)
│   └── reporting-service/   (planned – v2)


---

## ✅ Version 1 – Implemented (Current)

Version 1 focuses on building a **fully functional and secure core system**.

### 1️⃣ Auth Service
Responsible for **identity and authentication**.

**Features**
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- `/auth/me` endpoint to fetch authenticated user info

**Responsibilities**
- Acts as the single source of truth for user identity
- Issues JWTs consumed by other services
- No business logic leakage into other services

---

### 2️⃣ Project Service
Responsible for **project ownership and membership**.

**Features**
- Project creation
- Project ownership model (one owner per project)
- Adding and managing project members
- Authorization checks based on JWT user identity

**Responsibilities**
- Defines who belongs to which project
- Enforces owner-only actions
- Acts as a gatekeeper for downstream services

---

### 3️⃣ Task Service
Responsible for **task management inside projects**.

**Features**
- Task creation within a project
- Task assignment to specific users
- Fetching tasks based on project membership and assignment
- Strict access control using project membership validation

**Responsibilities**
- Ensures tasks belong to a project
- Ensures users only see tasks they are authorized to see
- Does not handle scoring, reviews, or evidence

---

## 🔐 Security Model (Version 1)

- All protected routes require JWT authentication
- `userId` is **never trusted from request body**
- Authorization is enforced at the service level
- Clear separation between authentication and authorization

---

## 🧪 Version 1 Scope Boundary

Intentionally **excluded** from Version 1:
- Evidence uploads
- Peer reviews
- Scoring logic
- Analytics and reports
- Background jobs, queues, or caching layers

This keeps the system stable, testable, and extensible.

---

## 🚧 Version 2 – Planned

Version 2 will extend the system without modifying Version 1 contracts.

### 🔜 Evidence Service
- Upload or link proof of task completion
- Timestamped and immutable records
- Associated with tasks and users

### 🔜 Review Service
- Peer or owner reviews on submitted evidence
- Qualitative feedback and approval/rejection flow

### 🔜 Scoring Service
- Computes scores based on:
  - Task completion
  - Evidence submission
  - Reviews
- Derived data only (not a source of truth)

### 🔜 Reporting Service
- Read-only aggregation service
- Project-level and user-level performance summaries
- No write access to core data

---

## 🧩 Design Principles Followed

- Single responsibility per service
- Explicit data ownership
- Minimal shared state
- Versioned growth, not feature dumping
- Security before convenience

---

## 🚀 Future Improvements
- API gateway
- Role-based access control (RBAC)
- Refresh tokens
- Rate limiting
- Audit logs
- CI/CD pipelines

---

## 📌 Status

✔ Version 1 complete  
🚧 Version 2 planned  
🧠 Architecture intentionally extensible  

---

## 👤 Author

Built as a learning-focused, production-inspired backend system emphasizing **clarity, discipline, and correctness**.

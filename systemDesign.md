# Group Project Accountability Tracker – System Design

## 1. The Core Problem
In academic and professional group projects:
- **Inequality**: Some members carry the load while others (freeloaders) do minimal work.
- **Grading Bias**: Often, every member receives the same grade regardless of individual input.
- **Lack of Record**: There is no objective, unalterable system to track "who did what and when."

**The GPA Tracker solves this by providing "Visible Truth."**

---

## 2. Solution Philosophy
The system **records actions as evidence** and **calculates contribution** from that evidence.
- **Objective**: No opinions, only logs.
- **Immutable**: Evidence cannot be deleted or edited.
- **Verifiable**: Leaders/Faculties must approve work before it counts towards a score.

---

## 3. Technical Architecture (Microservices)
The backend is split into independent services to handle specific domains:

### 3.1 Auth Service (Port 4001)
- Handles user identity (Registration/Login).
- Issues JWT tokens for secure cross-service communication.
- Manages user profiles and roles.

### 3.2 Project Service (Port 4002)
- Handles project containers and group logic.
- Managed memberships (Project Owners vs. Members).
- Handles invites and group roles.

### 3.3 Task Service (Port 4003)
- The core engine for work tracking.
- Implements the task lifecycle: `CREATED` → `IN_PROGRESS` → `DONE` → `APPROVED`.
- Triggers **Evidence Recording** on every state change.

---

## 4. Evidence Engine (The Heart)
Located in the `shared` directory, the event recorder captures every meaningful action:
- **Type**: TASK_CREATED, STATUS_CHANGED, TASK_APPROVED.
- **Timestamp**: Server-side timestamp (non-alterable).
- **Metadata**: Stores the context (Task Title, status transition).
- **Storage**: Saved in the `evidence_events` table, which serves as an append-only audit log.

---

## 5. Work Flow & Accountability Logic

### 5.1 Task Lifecycle
1. **Creation**: Leader creates a task and assigns it. (Logged as evidence)
2. **Acceptance**: Member marks task as `IN_PROGRESS`. (Logged as evidence)
3. **Submission**: Member marks task as `DONE`. (Logged as evidence)
4. **Validation**: Leader verifies the work and marks it as `APPROVED`. (Logged as evidence)

**Only APPROVED tasks contribute to the final Accountability Score.**

### 5.2 Accountability Scoring
The system calculates a score for each member based on:
- **Completion Rate**: (Approved Tasks / Assigned Tasks) * 100.
- **Consistency**: Frequency and timing of evidence (to prevent last-minute spam).
- **Approval Quality**: Work that is rejected or stays "DONE" without being approved lowers the score potential.

---

## 6. Implementation Stack
- **Backend**: Node.js & TypeScript, Express.js.
- **Database**: PostgreSQL (Centralized for shared schema access).
- **Frontend**: React (Vite), SPA architecture.
- **Communication**: REST APIs with JWT authentication.

---

## 7. Anti-Cheat Mechanisms
- **Append-only Logs**: Even if a task is deleted (not currently allowed), the `evidence_events` log remains as proof of intent or action.
- **Strict Roles**: Only assigned owners can update status; only project owners can approve.
- **Audit Trail**: Every action is linked to a user ID and a timestamp, making "fake work" detectable through sequence analysis.

---

## 8. Development Roadmap
- [x] **v0.1 (Proof)**: Auth, Projects, Tasks, Persistent Session, Confirmation Modals.
- [x] **v0.2 (Evidence)**: Unified Evidence logging, Activity Tracker.
- [ ] **v0.3 (Scoring)**: Centralized Scoring Engine with advanced weighting.
- [ ] **v1.0 (Integration)**: GitHub Action hooks and PDF Report export.

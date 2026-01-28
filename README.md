# GPA Tracker - Group Project Accountability System

[![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue.svg)](systemDesign.md)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Frontend-React-61dafb.svg)](https://reactjs.org/)

## 🚀 The Vision
In group projects, "freeloading" is a systemic issue. Traditional tools track tasks, but they don't provide **accountability evidence**. 

**GPA Tracker** is designed to provide "Visible Truth." It records every action as unalterable evidence, ensuring that contributions are transparent, verifiable, and automatically scored.

---

## 🛠️ Problem & Solution

### The Problem
- **Laziness Paradox**: Members who do no work get the same grade.
- **Subjective Grading**: Leaders often guess who did what.
- **Lack of Proof**: "I did it but forgot to update" - common excuse used to hide inactivity.

### The Solution
- **Action-as-Evidence**: Every task lifecycle event (Start, Finish, Approve) is logged with a server-side timestamp.
- **Leader Validation**: Work doesn't count until the Project Owner (Leader/Faculty) approves the quality.
- **Append-Only Activity**: Even if a project is deleted, the history of work remains in the audit log.

---

## ✨ Exclusive Features

- **🏆 Accountability Scoring**: An automatic score calculated solely from **Approved Work**.
- **📍 Evidence Audit Trail**: A "coming soon" activity feed that shows a play-by-play of the project as it happened.
- **🔒 Approval Gateway**: Only the project owner can move a task from "Done" to "Approved."
- **🛡️ Microservice Security**: Multi-layered auth with JWT ensures that only assigned members can touch specific tasks.
- **✨ Premium UI**: Modern glassmorphic design with real-time feedback and persistent sessions.

---

## 🏗️ Technical Stack

- **Frontend**: React (Vite), TypeScript, Lucide Icons, Vanilla CSS.
- **Backend (Microservices)**:
    - **Auth Service**: User identity and JWT management.
    - **Project Service**: Dynamic group management and memberships.
    - **Task Service**: The logic engine for work and evidence recording.
- **Database**: PostgreSQL with a shared schema architecture.
- **Logic**: Event-driven evidence recording via a shared helper module.

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** instance

### Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/nirvair09/Group-Project-Accountability-Tracker.git
   ```

2. **Database Setup**
   - Create a database named `gpa`.
   - Update the `.env` in the `backend/` folder with your `DATABASE_URL`.
   - Run the initialization script:
     ```bash
     cd backend
     npm install
     npx ts-node init-db.ts
     ```

3. **Install Dependencies**
   ```bash
   # In root
   npm run install:all
   cd ../frontend
   npm install
   ```

4. **Running Locally**
   - Start Backend (Terminal 1):
     ```bash
     cd backend
     npm run dev
     ```
   - Start Frontend (Terminal 2):
     ```bash
     cd frontend
     npm run dev
     ```

---

## 📈 Accountability Formula
The current contribution score is calculated as:
$$Score = \left( \frac{\text{Approved Tasks}}{\text{Total Assigned Tasks}} \right) \times 100$$

*Future updates will include time-consistency weighting and peer review adjustments.*

---

## 📜 System Design
For a deep dive into the architecture, check out the [System Design Document](systemDesign.md).

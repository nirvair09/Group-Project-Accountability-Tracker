# Group Project Accountability Tracker – Simple System Design

## 1. The Problem

In group projects:

- Some people work a lot
- Some people barely work
- Everyone gets the same grade

The real issue is not laziness.  
The issue is **no system to record who actually did what**.

This app exists to:
→ record work  
→ show contribution clearly  
→ make freeloading visible

No spying. No guessing. Just recorded actions.

---

## 2. What the System Does (In One Line)

It **records actions as evidence**, then **calculates contribution** from that evidence.

No opinions. No “trust me bro”.

---

## 3. Main Parts of the System

Think of the system as **7 simple boxes**.

---

### 3.1 Login & Users

Purpose:

- Who are you?
- Are you a student or faculty?
- Which group are you in?

That’s it.  
No project logic here.

---

### 3.2 Projects

Purpose:

- Create a project
- Add members
- Set deadlines and milestones

A project is just a **container**.

---

### 3.3 Tasks (Very Important)

Purpose:

- Break project into **clear tasks**
- Assign owners
- Track task status

Example tasks:

- “Design database schema”
- “Write report section 2”
- “Create PPT slides”

Each task has:

- Owner
- Deadline
- Status (created → in progress → done)

If you didn’t own a task, you didn’t do work.

---

### 3.4 Evidence (The Heart of the System)

This is the **most important part**.

Every action creates **evidence**.

Examples:

- Task marked done
- File uploaded
- Comment added
- Peer review submitted
- Git commit linked (optional)

Rules:

- Evidence is **never deleted**
- Evidence is **never edited**
- Everything is time-stamped

If it’s not recorded, it didn’t happen.

---

### 3.5 Peer Reviews

At milestones, students review each other on:

- Did this person complete tasks?
- Were they reliable?
- Did they help?

Important rule:
Peer reviews are **weighted**.

People who worked more:
→ their review matters more  
People who worked less:
→ their review matters less

This prevents “lazy group gangs”.

---

### 3.6 Scoring Engine (Automatic)

This part calculates contribution.

It looks at:

- Tasks completed
- Deadlines met or missed
- Amount of evidence
- Peer reviews (weighted)
- Work spread over time

It runs automatically in the background.

No manual grading.

---

### 3.7 Reports

Faculty sees:

- Who did what
- When they did it
- Contribution percentage
- Red flags (last-minute work, fake activity)

Students see:

- Their own contribution
- How it compares to others

No arguing. The data is visible.

---

## 4. How Everything Works Together (Simple Flow)

Example: Student completes a task

1. Task is marked DONE
2. System records this as evidence
3. Evidence is saved forever
4. Scoring engine updates scores
5. Report shows updated contribution

Nothing is overwritten.
Everything leaves a trail.

---

## 5. How Contribution Is Calculated (Simple Idea)

Contribution depends on:

- How many tasks you owned
- How many you finished
- Whether you finished on time
- How consistent your work was
- What others say about you (weighted)

Scores are **relative inside the group**.

So:

- In a lazy group, effort still stands out
- In a strong group, freeloading is obvious

---

## 6. How the System Stops Cheating

Common tricks and how the system handles them:

• **Last-day work spam**
→ flagged as suspicious

• **Touching many tasks but finishing none**
→ low score

• **Fake peer reviews**
→ low-weight reviewers don’t matter

• **Spam comments or uploads**
→ repeated low-value actions lose weight

The system assumes people will try to cheat.

---

## 7. Technology (Kept Simple)

Backend:

- Node.js + TypeScript

Database:

- PostgreSQL

Frontend:

- React

Events:

- Simple background worker (no heavy tools at start)

Authentication:

- JWT tokens

No overengineering.

---

## 8. Versions (Build in Order)

### Version 0.1 – Proof

- Login
- Projects
- Tasks
- Evidence logging
- Basic score calculation

### Version 0.2 – Fairness

- Automatic scoring
- Peer reviews
- Contribution reports

### Version 0.3 – Anti-Cheat

- Suspicious activity detection
- Better scoring rules

### Version 1.0 – Final

- GitHub integration
- Exportable reports
- Admin controls

---

## 9. Important Rule

If the system:

- Trusts self-reported work
- Allows deleting evidence
- Hides how scores are calculated

Then it has failed.

The whole point is **visible truth**.

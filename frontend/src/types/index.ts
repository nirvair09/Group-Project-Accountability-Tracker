/* =========================
   USER & IDENTITY
   ========================= */

export type UserRole = "STUDENT" | "FACULTY";

export type User = {
  id: string;
  name: string;
};

/* =========================
   PROJECT
   ========================= */

export type Project = {
  id: string;
  name: string;
  ownerId: string; // creator / project owner
};

export type ProjectMember = {
  projectId: string;
  userId: string;
  role: UserRole;
  joinedAt?: string;
};

/* =========================
   TASKS
   ========================= */

export type TaskStatus = "CREATED" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  ownerId: string;
  status: TaskStatus;
  deadline?: string;
  createdAt?: string;
};

/* =========================
   MILESTONES
   ========================= */

export type Milestone = {
  id: string;
  projectId: string;
  name: string;
  startTime: string;
  endTime: string;
};

/* =========================
   EVIDENCE (IMMUTABLE EVENTS)
   ========================= */

export type EvidenceType =
  | "PROJECT_CREATED"
  | "PROJECT_MEMBER_ADDED"
  | "MILESTONE_CREATED"
  | "TASK_CREATED"
  | "TASK_STATUS_CHANGED"
  | "FILE_UPLOADED"
  | "COMMENT_ADDED"
  | "PEER_REVIEW_SUBMITTED";

export type EvidenceEvent = {
  id: string;
  projectId: string;
  userId: string;
  type: EvidenceType;
  timestamp: string;
  metadata: Record<string, any>;
};

/* =========================
   PEER REVIEWS
   ========================= */

export type PeerReview = {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  score: number; // 1–5
  createdAt?: string;
};

/* =========================
   CONTRIBUTION (FRONTEND VIEW)
   ========================= */

/*
  This is NOT raw data.
  This is a derived, computed view.
  Backend scoring engine will produce this later.
*/

export type ContributionSummary = {
  userId: string;
  taskCount: number;
  completedTasks: number;
  onTimeTasks: number;
  evidenceCount: number;
  peerScoreAvg: number;
  contributionScore: number; // normalized (0–100)
};

/* =========================
   FACULTY REPORT VIEW
   ========================= */

export type ProjectReport = {
  projectId: string;
  generatedAt: string;
  contributors: ContributionSummary[];
  flags: string[];
};
